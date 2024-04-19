import { DatabaseTable } from '@dm/core'

export interface DatabaseClientImp<Configuration, Connection> {
  testConnection(configuration: Configuration): Promise<boolean>
  connection<R>(configuration: Configuration, inConnection?: (connection: Connection) => Promise<R>): Promise<R | null>
  disconnection(connection: Connection): Promise<boolean>
  getTables(configuration: Configuration): Promise<string[] | null>
  runSql(configuration: Configuration, sql: string): Promise<unknown>
  getTableInfo(configuration: Configuration, tableName: string): Promise<DatabaseTable | null>
}
