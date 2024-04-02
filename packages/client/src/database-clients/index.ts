import DatabaseClient from './database-client'
import mysqlClient from './mysql'
import { CLIENT_NAMES } from '@dm/core'

const databaseClients: Record<string, DatabaseClient> = {
  [CLIENT_NAMES.mysql]: mysqlClient,
}

export { DatabaseClient, databaseClients }
