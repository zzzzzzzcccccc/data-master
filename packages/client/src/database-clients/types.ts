import { Table, TableDetails } from '@dm/core'

export type QueryListPayload = {
  tableName: string
  limit?: [number, number]
  sorts?: Array<{ type: string; field: string }>
}

export type QueryListResult<Result> = {
  data: Result[]
  total: string
}

export interface DatabaseClientImp<Configuration, Connection> {
  testConnection(configuration: Configuration): Promise<boolean>
  connection<R>(configuration: Configuration, inConnection?: (connection: Connection) => Promise<R>): Promise<R | null>
  disconnection(connection: Connection): Promise<boolean>
  runSql(configuration: Configuration, sql: string): Promise<unknown>
  getTables(configuration: Configuration): Promise<Table[] | null>
  getTableInfo(configuration: Configuration, tableName: string): Promise<TableDetails | null>
  queryList<Result extends Record<string, unknown>>(
    configuration: Configuration,
    payload: QueryListPayload,
  ): Promise<QueryListResult<Result> | null>
}
