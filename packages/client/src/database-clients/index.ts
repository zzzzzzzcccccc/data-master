import DatabaseClient from './database-client'
import mysqlClient from './mysql'
import postgresClient from './postgres'
import { CLIENT_NAMES } from '@dm/core'

const databaseClients: Record<string, DatabaseClient> = {
  [CLIENT_NAMES.mysql.key]: mysqlClient,
  [CLIENT_NAMES.postgres.key]: postgresClient,
}

export { DatabaseClient, databaseClients }
