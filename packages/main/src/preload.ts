import * as electron from 'electron'
import { PRELOAD_INJECTOR, type PreloadInjector } from '@db-gui/core'
import { getDeviceInfo } from './exposes'

function bootstrap() {
  electron.contextBridge.exposeInMainWorld(PRELOAD_INJECTOR, {
    getDeviceInfo,
  } as PreloadInjector)
}

bootstrap()
