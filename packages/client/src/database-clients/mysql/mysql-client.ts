import DatabaseClient from '../database-client'
import { CLIENT_NAMES } from '@db-gui/core'
import mysql, { Connection } from 'mysql2/promise'

class MysqlClient extends DatabaseClient<mysql.ConnectionOptions, Connection> {
  constructor() {
    super(CLIENT_NAMES.mysql)
  }

  public override async connection(configuration: mysql.ConnectionOptions, autoConnection = true) {
    const connection = await mysql.createConnection(configuration)
    if (autoConnection) {
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