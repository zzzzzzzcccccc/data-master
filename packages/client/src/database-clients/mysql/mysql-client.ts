import DatabaseClient from '../database-client'
import mysql, { Connection } from 'mysql2/promise'

class MysqlClient extends DatabaseClient<mysql.ConnectionOptions, Connection> {
  constructor() {
    super()
  }

  public override async connection(configuration: mysql.ConnectionOptions, autoDisConnection = true) {
    const connection = await mysql.createConnection(configuration)
    if (autoDisConnection) {
      await this.disconnection(connection)
    }
    return connection
  }

  public override disconnection(connection: Connection) {
    return connection.end()
  }

  public override async getTables(configuration: mysql.ConnectionOptions) {
    const connection = await this.connection(configuration, false)
    const [rows] = await connection.query('SHOW TABLES')
    await this.disconnection(connection)
    return { rows }
  }
}

const mysqlClient = new MysqlClient()

export default mysqlClient
