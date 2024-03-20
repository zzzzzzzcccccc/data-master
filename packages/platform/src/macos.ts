import { bootstrap } from '@db-gui/app'
import { Platform } from '@db-gui/core'

const injector = document.getElementById('root')

if (injector) {
  bootstrap({ injector, platform: Platform.Macos })
}
