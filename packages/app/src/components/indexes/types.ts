import { type TableIndex } from '@dm/core'

export interface IndexesProps {
  mode: 'db'
  data: TableIndex[]
}

export interface DbIndexProps {
  item: TableIndex
}
