import DatabaseClient from '../database-client'
import { DatabaseClientImp } from '../types'
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
}

const mysqlClient = new MysqlClient()

export default mysqlClient
