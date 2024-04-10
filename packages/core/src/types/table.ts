export interface DatabaseIndex {
  name: string
  columns: string[]
  unique: boolean
}

export interface DatabaseForeignKey {
  column: string
  references: {
    table: string
    column: string
  }
}

export interface DatabaseColumn {
  name: string
  dataType: string
  size?: number
  defaultValue?: unknown
  noNull?: boolean
  comment?: string
}

export interface DatabaseTable {
  name: string
  columns: DatabaseColumn[]
  primaryKey?: string[]
  uniqueKeys?: string[]
  indexes?: DatabaseIndex[]
  foreignKeys?: DatabaseForeignKey[]
  checks?: string[]
  comment?: string
}
