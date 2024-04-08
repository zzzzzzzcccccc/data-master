import DatabaseClient from '../database-client'
import { Client, ClientConfig } from 'pg'

class PostgresClient extends DatabaseClient<ClientConfig, Client> {
  constructor() {
    super()
  }

  public override async testConnection(configuration: ClientConfig) {
    await this.connection(configuration)
    return true
  }

  public override async connection<R>(
    configuration: ClientConfig,
    inConnection?: (connection: Client) => R | Promise<R>,
  ) {
    const client = new Client(configuration)
    await client.connect()
    if (inConnection) {
      const result = await inConnection(client)
      await this.disconnection(client)
      return result
    } else {
      await this.disconnection(client)
      return null
    }
  }

  public override disconnection(connection: Client) {
    return connection.end()
  }

  public override getTables(configuration: ClientConfig) {
    return this.connection(configuration, async (connection) => {
      const queryResult = await connection.query(
        `SELECT table_name FROM information_schema.tables WHERE table_schema = current_database()`,
      )
      return queryResult.rows.map((row) => row.table_name)
    })
  }
}

const postgresClient = new PostgresClient()

export default postgresClient
