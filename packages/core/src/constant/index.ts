export const PRELOAD_INJECTOR = '__PRELOAD_INJECTOR__'

export const DARWIN = 'darwin'

export const WIN32 = 'win32'

export const ELECTRON_APP_EVENT_NAME = {
  ready: 'ready',
  activate: 'activate',
  beforeQuit: 'before-quit',
  windowAllClosed: 'window-all-closed',
} as const

export const ELECTRON_WINDOW_EVENT_NAME = {
  readyToShow: 'ready-to-show',
  close: 'close',
} as const
