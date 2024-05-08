export const STORE_ROOT_DIR_NAME = 'store'
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
export const URI_GATE_WAY = 'data-master://gateway'
export const URI_NAMESPACES = {
  database: 'database',
  store: 'store',
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
export const STORE_NAMES = {
  configuration: {
    key: 'configuration',
  },
}
export const URI = {
  database: Object.keys(CLIENT_NAMES).reduce(
    (acc, key) => {
      const item = CLIENT_NAMES[key as keyof typeof CLIENT_NAMES]
      acc[item.key] = `${URI_NAMESPACES.database}/${item.key}`
      return acc
    },
    {} as Record<string, string>,
  ),
  store: Object.keys(STORE_NAMES).reduce(
    (acc, key) => {
      const item = STORE_NAMES[key as keyof typeof STORE_NAMES]
      acc[item.key] = `${URI_NAMESPACES.store}/${item.key}`
      return acc
    },
    {} as Record<string, string>,
  ),
}
export const PAGE_SIZE_MAPPER = {
  '500': 500,
  '1000': 1000,
  '5000': 5000,
}
