import * as electron from 'electron'
import { HTTP_REQUEST_CODE, REQUEST_TIMEOUT, RpcRequestResponse, RpcRequestMessage } from '@dm/core'

const genEventId = (function GenEventId() {
  const map = new Map<string, number>()

  return (namespace: string) => {
    if (!map.has(namespace)) {
      map.set(namespace, 0)
    }
    const curId = map.get(namespace) as number
    map.set(namespace, curId + 1)

    return `${namespace}-${curId}`
  }
})()

function rpcRequest<Data>(uri: string, method: string, ...args: unknown[]): Promise<RpcRequestResponse<Data>> {
  if (!uri) {
    return Promise.resolve({ data: null, error: 'uri is required', code: HTTP_REQUEST_CODE.badRequest })
  }

  if (!method) {
    return Promise.resolve({ data: null, error: 'method is required', code: HTTP_REQUEST_CODE.badRequest })
  }

  return new Promise<RpcRequestResponse<Data>>((resolve) => {
    const eventId = genEventId(`${uri}-${method}`)
    const replyEvent = `${uri}:${method}:${eventId}`
    const handler = (_event: Electron.IpcRendererEvent, response: RpcRequestResponse<Data>) => {
      clearTimeout(timer)
      resolve(response)
    }
    const timer = setTimeout(() => {
      electron.ipcRenderer.off(replyEvent, handler)
      resolve({
        data: null,
        error: `${uri} ${method} timeout ${REQUEST_TIMEOUT} ms`,
        code: HTTP_REQUEST_CODE.timeout,
      })
    }, REQUEST_TIMEOUT)
    const senderPayload: RpcRequestMessage = { method, args, replyEvent }

    electron.ipcRenderer.send(uri, senderPayload)
    electron.ipcRenderer.once(replyEvent, handler)
  })
}

export default rpcRequest
