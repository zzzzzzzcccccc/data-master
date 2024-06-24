import { TableForeign } from '@dm/core'

export interface ForeignerProps {
  mode: 'db'
  data: TableForeign[]
}

export interface DbForeignProps {
  item: TableForeign
}
