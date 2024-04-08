import * as fs from 'fs'
import * as electron from 'electron'
import { APP_NAME, STORE_ROOT_DIR_NAME, STORE_VERSION } from '@dm/core'
import ConfigurationStore from './configuration-store'
import { jsonToString, logger as baseLogger } from '../utils'

const logger = baseLogger.getSubLogger('Store')

class Store {
  private readonly _rootPath: string

  private readonly _configuration: ConfigurationStore

  private static mkdirSync(dir: string) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }
  }

  constructor() {
    const appPath = electron.app.getPath('appData') + `/${APP_NAME}`

    Store.mkdirSync(appPath)

    this._rootPath = `${appPath}/${STORE_ROOT_DIR_NAME}`

    Store.mkdirSync(this._rootPath)

    this._configuration = new ConfigurationStore({
      rootPath: this._rootPath,
      version: STORE_VERSION,
      encoding: 'utf-8',
    })
  }

  public invoke(instance: string, method: string, ...args: unknown[]) {
    const storeInstance = this[instance as keyof this]
    if (!storeInstance) {
      throw new Error(`Store ${instance} not found`)
    }
    const instanceMethod = storeInstance[method as keyof typeof storeInstance]
    if (!instanceMethod || typeof instanceMethod !== 'function') {
      throw new Error(`${method} not found in store ${instance}`)
    }
    logger.info(`invoke instance=${instance} method=${method} args=${jsonToString(args)}`)
    return instanceMethod.apply(storeInstance, args)
  }

  get configuration() {
    return this._configuration
  }
}

const store = new Store()

export default store
