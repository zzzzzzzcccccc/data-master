import * as electron from 'electron'
import { URI_GATE_WAY, HTTP_REQUEST_CODE, RpcRequestResponse, RpcRequestMessage } from '@dm/core'

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
    const replyEvent = genEventId(`${uri}-${method}`)
    const handler = (_event: Electron.IpcRendererEvent, response: RpcRequestResponse<Data>) => {
      resolve(response)
    }
    const senderPayload: RpcRequestMessage = { uri, method, args, replyEvent }

    electron.ipcRenderer.send(URI_GATE_WAY, senderPayload)
    electron.ipcRenderer.once(replyEvent, handler)
  })
}

export default rpcRequest
