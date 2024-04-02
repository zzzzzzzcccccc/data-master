import { type ObjectEncodingOptions } from 'fs'

export interface StoreOptions {
  rootPath: string
  version: number
  encoding: ObjectEncodingOptions['encoding']
}
