import { PRELOAD_INJECTOR } from '@dm/core'

export default function getPreloadInjector() {
  return window[PRELOAD_INJECTOR]
}
