import DatabaseClient from '../database-client'
import { DatabaseClientImp } from '../types'
import { DatabaseTable } from '@dm/core'
import mysql, { Connection, ConnectionOptions } from 'mysql2/promise'

class MysqlClient extends DatabaseClient implements DatabaseClientImp<ConnectionOptions, Connection> {
  constructor() {
    super()
  }

  public async testConnection(configuration: ConnectionOptions) {
    await this.connection(configuration)
    return true
  }

  public async connection<R>(configuration: ConnectionOptions, inConnection?: (connection: Connection) => Promise<R>) {
    const connection = await mysql.createConnection(configuration)
    if (inConnection) {
      const result = await inConnection(connection)
      await this.disconnection(connection)
      return result
    } else {
      await this.disconnection(connection)
      return null
    }
  }

  public async disconnection(connection: Connection) {
    await connection.end()
    return true
  }

  public getTables(configuration: ConnectionOptions) {
    return this.connection(configuration, async (connection) => {
      const [queryResult] = await connection.execute('SHOW TABLES')
      if (queryResult && Array.isArray(queryResult)) {
        return queryResult.map((item: object) => Object.values(item).join('')).filter(Boolean)
      }
      return [] as string[]
    })
  }

  public runSql(configuration: ConnectionOptions, sql: string): Promise<unknown> {
    return this.connection(configuration, (connection) => {
      return connection.execute(sql)
    })
  }

  public getTableInfo(configuration: ConnectionOptions, tableName: string): Promise<DatabaseTable | null> {
    return this.connection(configuration, async (connection) => {
      const [[columns], [indexes]] = await Promise.all([
        this.getTableColumns(connection, tableName),
        this.getTableIndexes(connection, tableName),
      ])
      return this.getDatabaseTable({ tableName, columns, indexes })
    })
  }

  private getTableColumns(connection: Connection, tableName: string) {
    return connection.execute(`SHOW COLUMNS FROM ${tableName}`)
  }

  private getTableIndexes(connection: Connection, tableName: string) {
    return connection.execute(`SHOW INDEX FROM ${tableName} `)
  }

  private getDatabaseTable({
    tableName,
    columns,
    indexes,
  }: {
    tableName: string
    columns: mysql.QueryResult
    indexes: mysql.QueryResult
  }) {
    return {
      name: tableName,
      columns,
      indexes,
    } as DatabaseTable
  }
}

const mysqlClient = new MysqlClient()

export default mysqlClient
