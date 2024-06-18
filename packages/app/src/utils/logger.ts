import { URI_NAMESPACES } from '@dm/core'
import getPreloadInjector from './get-preload-injector'

const { rpcRequest } = getPreloadInjector()

const log = (type: string, ...args: unknown[]) => {
  return rpcRequest(URI_NAMESPACES.logger, type, ...args)
}

const logSub = (type: string, sub: string, ...args: unknown[]) => {
  return rpcRequest(`${URI_NAMESPACES.logger}/${sub}`, type, ...args)
}

const logger = {
  debug: (...args: unknown[]) => log('debug', ...args),
  info: (...args: unknown[]) => log('info', ...args),
  warning: (...args: unknown[]) => log('warn', ...args),
  error: (...args: unknown[]) => log('error', ...args),
  getSubLogger: (name: string) => {
    return {
      debug: (...args: unknown[]) => logSub('debug', name, ...args),
      info: (...args: unknown[]) => logSub('info', name, ...args),
      warning: (...args: unknown[]) => logSub('warn', name, ...args),
      error: (...args: unknown[]) => logSub('error', name, ...args),
    }
  },
}

export default logger
