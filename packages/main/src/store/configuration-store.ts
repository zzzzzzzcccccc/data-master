import * as fs from 'fs'
import { StoreOptions } from './types'
import { generateUUID, jsonToString, stringToJson, logger as baseLogger } from '../utils'
import { ConnectionConfiguration, STORE_NAMES } from '@dm/core'

const logger = baseLogger.getSubLogger('ConfigurationStore')

class ConfigurationStore {
  private readonly _options: StoreOptions

  private readonly dirName = `${STORE_NAMES.configuration.key}.json`

  constructor(options: StoreOptions) {
    this._options = options
    this.init()
  }

  public findAll(): ConnectionConfiguration[] {
    const response = stringToJson(fs.readFileSync(this.storePath, { encoding: this._options.encoding }).toString(), {
      version: this._options.version,
      data: [],
    })
    return response?.data || []
  }

  public findById(id: string): ConnectionConfiguration | null {
    return this.findAll().find((item: ConnectionConfiguration) => item.id === id) || null
  }

  public insert(item: Omit<ConnectionConfiguration, 'id'>) {
    logger.info(`Inserting item = ${jsonToString(item)}`)
    const data = this.findAll()
    const current = { ...item, id: generateUUID(), createAt: new Date().toString(), updateAt: '' }
    data.push(current)
    fs.writeFileSync(this.storePath, jsonToString({ version: this._options.version, data }), {
      encoding: this._options.encoding,
    })
    return current
  }

  public update(item: Partial<ConnectionConfiguration> & { id: string }) {
    const data = this.findAll()
    const index = data?.findIndex((i: ConnectionConfiguration) => i.id === item.id) || -1
    if (index > -1) {
      data[index] = { ...data[index], ...item, updateAt: new Date().toString() }
      fs.writeFileSync(this.storePath, jsonToString({ version: this._options.version, data }), {
        encoding: this._options.encoding,
      })
      return data[index]
    }
    return item
  }

  public delete(id: string) {
    const data = this.findAll()
    if (!data?.length) {
      return id
    }
    fs.writeFileSync(
      this.storePath,
      jsonToString({ version: this._options.version, data: data.filter((row) => row.id !== id) }),
      {
        encoding: this._options.encoding,
      },
    )
    return id
  }

  private init() {
    this.createDataStore()
  }

  private createDataStore() {
    if (!fs.existsSync(this.storePath)) {
      fs.writeFileSync(
        this.storePath,
        jsonToString({
          version: this._options.version,
          data: [],
        }),
        { encoding: this._options.encoding },
      )
      logger.info(`Configuration store created at ${this.storePath}`)
    }
    return this.storePath
  }

  get storePath() {
    return `${this._options.rootPath}/${this.dirName}`
  }
}

export default ConfigurationStore
