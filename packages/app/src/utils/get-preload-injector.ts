import { PRELOAD_INJECTOR, PreloadInjector } from '@db-gui/core'

export default function getPreloadInjector() {
  return (window as any)[PRELOAD_INJECTOR] as PreloadInjector
}
