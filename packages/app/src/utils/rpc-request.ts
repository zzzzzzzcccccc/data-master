import getPreloadInjector from './get-preload-injector'
import { logger as baseLogger } from '../utils'
import { HTTP_REQUEST_CODE } from '@dm/core'

const { rpcRequest: baseRpcRequest } = getPreloadInjector()
const logger = baseLogger.getSubLogger('RpcRequest')

const rpcRequest = async <Data>(uri: string, method: string, ...args: unknown[]): Promise<Data | null> => {
  const response = await baseRpcRequest<Data>(uri, method, ...args)
  if (response.code !== HTTP_REQUEST_CODE.ok) {
    logger.error(`RpcRequest error: uri=${uri} method=${method} ${response.error}`)
    return Promise.reject(new Error(response.error))
  }
  return response?.data ?? null
}

export default rpcRequest
