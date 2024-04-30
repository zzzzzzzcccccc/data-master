import getPreloadInjector from './get-preload-injector'
import baseLogger from './logger'
import { HTTP_REQUEST_CODE } from '@dm/core'

const { rpcRequest: baseRpcRequest } = getPreloadInjector()
const logger = baseLogger.getSubLogger('RpcRequest')

const rpcRequest = async <Data>(uri: string, method: string, ...args: unknown[]): Promise<Data | null> => {
  logger.debug(`RPC request start: uri=${uri} method=${method} args=${JSON.stringify(args)}`)

  const response = await baseRpcRequest<Data>(uri, method, ...args)
  if (response?.code !== HTTP_REQUEST_CODE.ok) {
    const error = (response?.error || 'unknown error') as string
    logger.error(`RpcRequest error: uri=${uri} method=${method} error=${error}`)
    return Promise.reject(new Error(error))
  }
  return response?.data ?? null
}

export default rpcRequest
