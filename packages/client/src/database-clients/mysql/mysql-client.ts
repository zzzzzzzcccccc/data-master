import DatabaseClient from '../database-client'
import { DatabaseClientImp, QueryListPayload, QueryListResult } from '../types'
import {
  numberToString,
  rowToString,
  Table,
  TableDetails,
  TableColumn,
  TableIndex,
  TableForeign,
  TableCheck,
  TableSqlResult,
} from '@dm/core'
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

  public runSql(configuration: ConnectionOptions, sql: string): Promise<TableSqlResult | null> {
    return this.connection(configuration, async (connection) => {
      const now = Date.now()
      const [rows, fields] = await connection.execute<mysql.RowDataPacket[] | mysql.ResultSetHeader>(sql)
      const rowsIsArray = Array.isArray(rows)

      return {
        rows: rowsIsArray ? rows.map((item) => rowToString(item)) : [],
        fields: rowsIsArray ? fields.map((field) => field.name) : [],
        affectedRows: rowsIsArray ? undefined : numberToString((rows as mysql.ResultSetHeader)?.affectedRows),
        insertId: rowsIsArray ? undefined : numberToString((rows as mysql.ResultSetHeader)?.insertId),
        duration: numberToString(Date.now() - now),
      }
    })
  }

  public getTables(configuration: ConnectionOptions) {
    return this.connection(configuration, async (connection) => {
      const [tables] = await connection.execute<mysql.RowDataPacket[]>(
        `SELECT * FROM information_schema.tables WHERE TABLE_SCHEMA = ?`,
        [connection.config.database],
      )
      return tables.map((item) => this.convertTable(item))
    })
  }

  public getTableInfo(configuration: ConnectionOptions, tableName: string): Promise<TableDetails | null> {
    return this.connection(configuration, async (connection) => {
      const [[columns], [indexes], [foreign], [checks]] = await Promise.all([
        this.getTableColumns(connection, tableName),
        this.getTableIndexes(connection, tableName),
        this.getTableForeign(connection, tableName),
        this.getTableChecks(connection, tableName),
      ])

      return {
        name: tableName,
        columns: columns.map((item) => this.convertColumn(item)),
        indexes: indexes.map((item) => this.convertIndex(item)),
        foreign: foreign.map((item) => this.convertForeign(item)),
        checks: checks.map((item) => this.convertCheck(item)),
      }
    })
  }

  public queryList<Result extends Record<string, unknown>>(
    configuration: ConnectionOptions,
    { tableName, limit = [0, 0], sorts = [] }: QueryListPayload,
  ): Promise<QueryListResult<Result> | null> {
    return this.connection(configuration, async (connection) => {
      const now = Date.now()
      const orderByClause = sorts.length
        ? 'ORDER BY ' + sorts.map((sort) => `${sort.field} ${sort.type}`).join(', ')
        : ''
      const [[rows], [countRows]] = await Promise.all([
        connection.execute<mysql.RowDataPacket[]>(
          `SELECT * FROM ${tableName} ${orderByClause} LIMIT ${limit[0]}, ${limit[1]}`,
        ),
        connection.execute<mysql.RowDataPacket[]>(`SELECT COUNT(*) as total FROM ${tableName}`),
      ])
      return {
        data: rows.map((item) => rowToString(item) as Result),
        total: numberToString(countRows?.[0]?.total || 0),
        duration: numberToString(Date.now() - now),
      }
    })
  }

  private async getTableColumns(connection: Connection, tableName: string) {
    return connection.execute<mysql.RowDataPacket[]>(
      `SELECT * FROM information_schema.columns WHERE table_schema = ? AND table_name = ?`,
      [connection.config.database, tableName],
    )
  }

  private getTableIndexes(connection: Connection, tableName: string) {
    return connection.execute<mysql.RowDataPacket[]>(
      `SELECT * FROM information_schema.statistics WHERE table_schema = ? AND table_name = ?`,
      [connection.config.database, tableName],
    )
  }

  private getTableForeign(connection: Connection, tableName: string) {
    return connection.execute<mysql.RowDataPacket[]>(
      `SELECT * FROM information_schema.key_column_usage WHERE table_schema = ? AND table_name = ? AND constraint_name != 'PRIMARY' AND referenced_table_name IS NOT NULL`,
      [connection.config.database, tableName],
    )
  }

  private getTableChecks(connection: Connection, tableName: string) {
    return connection.execute<mysql.RowDataPacket[]>(
      `SELECT * FROM information_schema.table_constraints WHERE table_schema = ? AND table_name = ? AND constraint_type = 'CHECK'`,
      [connection.config.database, tableName],
    )
  }

  private convertTable(item: mysql.RowDataPacket): Table {
    return {
      tableName: item?.TABLE_NAME || '',
      tableType: item?.TABLE_TYPE || '',
      tableEngine: item?.ENGINE || '',
      tableVersion: numberToString(item?.VERSION ?? 0),
      tableRowFormat: item?.ROW_FORMAT || '',
      tableRows: numberToString(item?.TABLE_ROWS ?? 0),
      tableAvgRowLength: numberToString(item?.AVG_ROW_LENGTH ?? 0),
      tableDataLength: numberToString(item?.DATA_LENGTH ?? 0),
      tableMaxDataLength: numberToString(item?.MAX_DATA_LENGTH ?? 0),
      tableIndexLength: numberToString(item?.INDEX_LENGTH ?? 0),
      tableDataFree: numberToString(item?.DATA_FREE ?? 0),
      tableAutoIncrement: numberToString(item?.AUTO_INCREMENT ?? 0),
      tableCreateTime: item?.CREATE_TIME ? new Date(item.CREATE_TIME).toString() : '',
      tableUpdateTime: item?.UPDATE_TIME ? new Date(item.UPDATE_TIME).toString() : '',
      tableCheckTime: item?.CHECK_TIME ? new Date(item.CHECK_TIME).toString() : '',
      tableCollation: item?.TABLE_COLLATION || '',
      tableComment: item?.TABLE_COMMENT || '',
    }
  }

  private convertColumn(item: mysql.RowDataPacket): TableColumn {
    return {
      columnName: item?.COLUMN_NAME || '',
      columnType: item?.COLUMN_TYPE || '',
      columnDefaultValue: item?.COLUMN_DEFAULT ?? null,
      columnNotNull: item?.IS_NULLABLE === 'NO',
      columnIsPrimaryKey: item?.COLUMN_KEY === 'PRI',
      columnExtra: item?.EXTRA || '',
      columnComment: item?.COLUMN_COMMENT || '',
    }
  }

  private convertIndex(item: mysql.RowDataPacket): TableIndex {
    return {
      columnName: item?.COLUMN_NAME || '',
      indexName: item?.INDEX_NAME || '',
      indexType: item?.INDEX_TYPE || '',
      indexComment: item?.INDEX_COMMENT || item?.COMMENT || '',
      unique: item?.NON_UNIQUE === 0,
    }
  }

  private convertForeign(item: mysql.RowDataPacket): TableForeign {
    return {
      columnName: item?.COLUMN_NAME || '',
      constraintName: item?.CONSTRAINT_NAME || '',
      referencedTableName: item?.REFERENCED_TABLE_NAME || '',
      referencedColumnName: item?.REFERENCED_COLUMN_NAME || '',
    }
  }

  private convertCheck(item: mysql.RowDataPacket): TableCheck {
    return {
      constraintName: item?.CONSTRAINT_NAME || '',
      checkClause: item?.CHECK_CLAUSE || '',
    }
  }
}

const mysqlClient = new MysqlClient()

export default mysqlClient
