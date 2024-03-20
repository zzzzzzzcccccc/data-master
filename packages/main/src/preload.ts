import * as electron from 'electron'
import { PRELOAD_INJECTOR, PreloadInjector } from '@db-gui/core'

function bootstrap() {
  electron.contextBridge.exposeInMainWorld(PRELOAD_INJECTOR, {} as PreloadInjector)
}

bootstrap()
