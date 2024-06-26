import { type TableColumn } from '@dm/core'

export interface ColumnsProps {
  mode: 'db'
  data: TableColumn[]
}

export interface DbColumnProps {
  item: TableColumn
}
