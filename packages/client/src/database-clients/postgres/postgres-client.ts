import DatabaseClient from '../database-client'
import { DatabaseClientImp } from '../types'
import { Client, ClientConfig } from 'pg'

class PostgresClient extends DatabaseClient implements DatabaseClientImp<ClientConfig, Client> {
  constructor() {
    super()
  }

  public async testConnection(configuration: ClientConfig) {
    await this.connection(configuration)
    return true
  }

  public async connection<R>(configuration: ClientConfig, inConnection?: (connection: Client) => Promise<R>) {
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

  public async disconnection(connection: Client) {
    await connection.end()
    return true
  }

  public getTables(configuration: ClientConfig) {
    return this.connection(configuration, async (connection) => {
      await connection.query(`SELECT table_name FROM information_schema.tables WHERE table_schema = current_database()`)
      return []
    })
  }

  public runSql(configuration: ClientConfig, sql: string) {
    return this.connection(configuration, async (connection) => {
      return connection.query(sql)
    })
  }

  public getTableInfo() {
    // TODO implement
    return Promise.resolve(null)
  }

  public queryList<Result extends Record<string, unknown>>() {
    // TODO implement
    return Promise.resolve({ data: [] as Result[], total: '0' })
  }
}

const postgresClient = new PostgresClient()

export default postgresClient
