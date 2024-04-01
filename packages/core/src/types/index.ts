export interface DeviceInfo {
  platform: string
  electronVersion: string
  nodeVersion: string
  chromeVersion: string
}

export type RpcRequestMessage<Params = unknown[]> = { method: string; replyEvent: string; args: Params }
export type RpcRequestResponse<Data> = { data: Data | null; error: unknown | null; code: string | number }

export interface PreloadInjector {
  getDeviceInfo(): DeviceInfo
  rpcRequest<Data>(uri: string, method: string, ...args: unknown[]): Promise<RpcRequestResponse<Data> | null>
}

export type DatabaseParams<Metadata = object> = [string, { id?: string; metadata?: Metadata }]
