import * as electron from 'electron'
import { PRELOAD_INJECTOR, PreloadInjector } from '@db-gui/core'
import { getDeviceInfo, rpcRequest } from './exposes'

function bootstrap() {
  electron.contextBridge.exposeInMainWorld(PRELOAD_INJECTOR, {
    getDeviceInfo,
    rpcRequest,
  } as PreloadInjector)
}

bootstrap()
