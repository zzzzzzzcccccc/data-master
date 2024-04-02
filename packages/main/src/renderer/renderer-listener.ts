import * as electron from 'electron'
import { URI, RpcRequestMessage, DatabaseParams, HTTP_REQUEST_CODE, safePromiseCall } from '@dm/core'
import { databaseClients } from '@dm/client'

class RendererListener {
  private _unListener: (() => void) | null = null

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
    const boundDatabaseHandler = this.databaseHandler.bind(this)

    electron.ipcMain.on(URI.database, boundDatabaseHandler)

    return () => {
      electron.ipcMain.off(URI.database, boundDatabaseHandler)
    }
  }

  private databaseHandler(event: electron.IpcMainEvent, message: RpcRequestMessage<DatabaseParams>) {
    const { replyEvent, method, args } = message
    const [clientName, payload] = args
    const { id, metadata } = payload
    const client = databaseClients[clientName]

    if (!client) {
      event.reply(replyEvent, {
        data: null,
        error: `Database client "${clientName}" not found`,
        code: HTTP_REQUEST_CODE.notFound,
      })
    } else {
      if (id) {
        // TODO get connection configuration from store
      }
      safePromiseCall(() => client.invokeMethod(method, metadata)).then((result) => {
        event.reply(replyEvent, {
          ...result,
          code: result.error ? HTTP_REQUEST_CODE.internalServerError : HTTP_REQUEST_CODE.ok,
        })
      })
    }
  }
}

const rendererListener = new RendererListener()

export default rendererListener
