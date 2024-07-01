export interface TableSqlResult {
  rows?: Record<string, unknown>[]
  fields?: string[]
  affectedRows?: string
  insertId?: string
  fieldCount?: string
}

export interface TableColumn {
  columnName: string
  columnType: string
  columnDefaultValue: unknown
  columnNotNull: boolean
  columnIsPrimaryKey: boolean
  columnExtra: string
  columnComment: string
}

export interface TableIndex {
  columnName: string
  indexName: string
  indexType: string
  indexComment: string
  unique: boolean
}

export interface TableForeign {
  columnName: string
  constraintName: string
  referencedTableName: string
  referencedColumnName: string
}

export interface TableCheck {
  constraintName: string
  checkClause: string
}

export interface TableDetails {
  name: string
  columns: TableColumn[]
  indexes: TableIndex[]
  foreign: TableForeign[]
  checks: TableCheck[]
}

export interface Table {
  tableName: string
  tableType: string
  tableEngine: string
  tableVersion: string
  tableRowFormat: string
  tableRows: string
  tableAvgRowLength: string
  tableDataLength: string
  tableMaxDataLength: string
  tableIndexLength: string
  tableDataFree: string
  tableAutoIncrement: string
  tableCreateTime: string
  tableUpdateTime: string
  tableCheckTime: string
  tableCollation: string
  tableComment: string
}
