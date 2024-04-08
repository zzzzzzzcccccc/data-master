import DatabaseClient from '../database-client'
import mysql, { Connection, ConnectionOptions } from 'mysql2/promise'

class MysqlClient extends DatabaseClient<mysql.ConnectionOptions, Connection> {
  constructor() {
    super()
  }

  public override async testConnection(configuration: ConnectionOptions) {
    await this.connection(configuration)
    return true
  }

  public override async connection<R>(
    configuration: mysql.ConnectionOptions,
    inConnection?: (connection: Connection) => R | Promise<R>,
  ) {
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

  public override disconnection(connection: Connection) {
    return connection.end()
  }

  public override getTables(configuration: mysql.ConnectionOptions) {
    return this.connection(configuration, async (connection) => {
      const [queryResult] = await connection.query('SHOW TABLES')
      return queryResult
    })
  }
}

const mysqlClient = new MysqlClient()

export default mysqlClient
