export interface DeviceInfo {
  platform: string
  electronVersion: string
  nodeVersion: string
  chromeVersion: string
}

export type ObjectMetadata = Record<string, string | number | boolean | null>

export type RpcRequestMessage<Params = unknown[]> = { uri: string; method: string; replyEvent: string; args: Params }
export type RpcRequestResponse<Data> = { data: Data | null; error: unknown | null; code: string | number }

export interface PreloadInjector {
  getDeviceInfo(): DeviceInfo
  rpcRequest<Data>(uri: string, method: string, ...args: unknown[]): Promise<RpcRequestResponse<Data> | null>
}

export type DatabaseParams = [string, ...unknown[]]
export type StoreParams = unknown[]

export interface ConnectionConfiguration {
  id: string
  name: string
  client: string
  metadata: Record<string, ObjectMetadata>
  createAt: string
  updateAt: string
}

export * from './database-table'
