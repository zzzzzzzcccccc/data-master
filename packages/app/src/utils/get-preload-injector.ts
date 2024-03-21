import { PRELOAD_INJECTOR } from '@db-gui/core'

export default function getPreloadInjector() {
  return window[PRELOAD_INJECTOR]
}
