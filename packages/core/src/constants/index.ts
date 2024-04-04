export const STORE_ROOT_DIR_NAME = '.data-master-store'
export const STORE_VERSION = 0
export const APP_NAME = 'DataMaster'
export const PRELOAD_INJECTOR = '__PRELOAD_INJECTOR__'
export const CSS_VARS_NAME_SPACE = '--dm'
export const DARWIN = 'darwin'
export const WIN32 = 'win32'
export const DEFAULT_MAIN_WINDOW_LAYOUT = {
  minWidth: 800,
  minHeight: 600,
  width: 1440,
  height: 900,
}
export const ELECTRON_APP_EVENT_NAME = {
  ready: 'ready',
  activate: 'activate',
  beforeQuit: 'before-quit',
  windowAllClosed: 'window-all-closed',
} as const
export const ELECTRON_WINDOW_EVENT_NAME = {
  readyToShow: 'ready-to-show',
  close: 'close',
  move: 'move',
} as const
export const DEFAULT_THEME_PRIMARY_COLOR = '#1890ff'
export const DARK_MEDIA_QUERY = '(prefers-color-scheme: dark)'
export const BASE_ROUTE = '/'
export const HTTP_REQUEST_CODE = {
  ok: 200,
  badRequest: 400,
  unauthorized: 401,
  notFound: 404,
  timeout: 408,
  internalServerError: 500,
}
export const REQUEST_TIMEOUT = 10 * 1000
export const URI = {
  database: 'database',
  configuration: 'configuration',
}
export const CLIENT_NAMES = {
  mysql: {
    key: 'mysql',
    icon: 'icon-mysql',
    defaultConfiguration: {
      name: '',
      metadata: {
        host: 'localhost',
        database: '',
        user: '',
        password: '',
        port: 3306,
      },
    },
  },
  postgres: {
    key: 'postgres',
    icon: 'icon-pgsql',
    defaultConfiguration: {
      name: '',
      metadata: {},
    },
  },
}
