import * as electron from 'electron'
import { URI_GATE_WAY, URI_NAMESPACES, RpcRequestMessage, HTTP_REQUEST_CODE, safePromiseCall } from '@dm/core'
import { databaseClients } from '@dm/client'
import { logger as baseLogger, jsonToString } from '../utils'
import store from '../store'

const logger = baseLogger.getSubLogger('RendererListener')

class RendererListener {
  private _unListener: (() => void) | null = null

  private static handlerError<T>(error: T) {
    if (!error) return null
    if (error instanceof Error) {
      return error.message
    }
    if (typeof error === 'string') {
      return error
    }
    return error
  }

  private static safePromiseHandlerOnError(path: string, method: string, error: unknown) {
    logger.error(`path=${path} method=${method}`, error)
  }

  private static databaseHandler = (client: string, event: electron.IpcMainEvent, message: RpcRequestMessage) => {
    logger.info(`start databaseHandler message=${jsonToString(message)}`)

    const { replyEvent, method, args } = message
    const databaseClient = databaseClients[client]

    if (!databaseClient) {
      event.reply(replyEvent, {
        data: null,
        error: `database client is not found for ${client}`,
        code: HTTP_REQUEST_CODE.notFound,
      })
    } else {
      safePromiseCall(
        () => databaseClient.invoke(method, ...args),
        (error) => RendererListener.safePromiseHandlerOnError(client, method, error),
      ).then((result) => {
        event.reply(replyEvent, {
          ...result,
          error: RendererListener.handlerError(result.error),
          code: result.isError ? HTTP_REQUEST_CODE.internalServerError : HTTP_REQUEST_CODE.ok,
        })
      })
    }
  }

  private static storeHandler = (instance: string, event: electron.IpcMainEvent, message: RpcRequestMessage) => {
    logger.info(`start storeHandler instance=${instance} message=${jsonToString(message)}`)

    const { replyEvent, method, args } = message
    safePromiseCall(
      () => store.invoke(instance, method, ...args),
      (error) => RendererListener.safePromiseHandlerOnError(instance, method, error),
    ).then((result) => {
      event.reply(replyEvent, {
        ...result,
        error: RendererListener.handlerError(result.error),
        code: result.isError ? HTTP_REQUEST_CODE.internalServerError : HTTP_REQUEST_CODE.ok,
      })
    })
  }

  public init() {
    if (!this._unListener) {
      this._unListener = this.listener()
    }
  }

  public destroy() {
    this._unListener?.()
    this._unListener = null
  }

  private listener() {
    const handler = (event: electron.IpcMainEvent, message: RpcRequestMessage) => {
      logger.info(`start gateway handler message=${jsonToString(message)}`)

      const uri = message.uri
      const [namespace, ...paths] = (uri || '').split('/')
      if (!namespace || !paths?.length) {
        event.reply(message.replyEvent, {
          data: null,
          error: 'uri is invalid',
          code: HTTP_REQUEST_CODE.badRequest,
        })
      } else {
        const path = paths.join('/')
        const uriHandlers = {
          [URI_NAMESPACES.database]: () => RendererListener.databaseHandler(path, event, message),
          [URI_NAMESPACES.store]: () => RendererListener.storeHandler(path, event, message),
        }
        if (!uriHandlers[namespace]) {
          event.reply(message.replyEvent, {
            data: null,
            error: `uri namespace is not found for ${namespace}`,
            code: HTTP_REQUEST_CODE.notFound,
          })
        } else {
          uriHandlers[namespace]()
        }
      }
    }

    electron.ipcMain.on(URI_GATE_WAY, handler)

    return () => {
      electron.ipcMain.off(URI_GATE_WAY, handler)
    }
  }
}

const rendererListener = new RendererListener()

export default rendererListener
