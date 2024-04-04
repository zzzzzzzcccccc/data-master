import * as electron from 'electron'
import { URI, RpcRequestMessage, DatabaseParams, StoreParams, HTTP_REQUEST_CODE, safePromiseCall } from '@dm/core'
import { databaseClients } from '@dm/client'
import { logger as baseLogger, jsonToString } from '../utils'
import store from '../store'

const logger = baseLogger.getSubLogger('RendererListener')

class RendererListener {
  private _unListener: (() => void) | null = null

  private static databaseHandler = (event: electron.IpcMainEvent, message: RpcRequestMessage<DatabaseParams>) => {
    logger.info(`start databaseHandler message=${jsonToString(message)}`)

    const { replyEvent, method, args } = message
    const [id, payload] = args

    if (!id) {
      event.reply(replyEvent, {
        data: null,
        error: 'id is required',
        code: HTTP_REQUEST_CODE.notFound,
      })
    } else {
      const configuration = store.configuration.findById(id)
      if (!configuration) {
        event.reply(replyEvent, {
          data: null,
          error: `configuration is not found for ${id}`,
          code: HTTP_REQUEST_CODE.notFound,
        })
      } else {
        const client = databaseClients[configuration.client]
        safePromiseCall(() => client.invoke(method, configuration, payload)).then((result) => {
          event.reply(replyEvent, {
            ...result,
            code: result.error ? HTTP_REQUEST_CODE.internalServerError : HTTP_REQUEST_CODE.ok,
          })
        })
      }
    }
  }

  private static storeHandler = (
    instance: string,
    event: electron.IpcMainEvent,
    message: RpcRequestMessage<StoreParams>,
  ) => {
    logger.info(`start storeHandler instance=${instance} message=${jsonToString(message)}`)

    const { replyEvent, method, args } = message
    safePromiseCall(() => store.invoke(instance, method, ...args)).then((result) => {
      event.reply(replyEvent, {
        ...result,
        code: result.error ? HTTP_REQUEST_CODE.internalServerError : HTTP_REQUEST_CODE.ok,
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
    electron.ipcMain.on(URI.database, RendererListener.databaseHandler)
    electron.ipcMain.on(URI.configuration, (event, message) =>
      RendererListener.storeHandler(URI.configuration, event, message),
    )

    return () => {
      electron.ipcMain.off(URI.database, RendererListener.databaseHandler)
      electron.ipcMain.off(URI.configuration, (event: electron.IpcMainEvent, message) =>
        RendererListener.storeHandler(URI.configuration, event, message),
      )
    }
  }
}

const rendererListener = new RendererListener()

export default rendererListener
