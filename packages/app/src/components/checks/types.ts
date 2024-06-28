import { TableCheck } from '@dm/core'

export interface ChecksProps {
  data: TableCheck[]
  mode: 'db'
}

export interface DbCheckProps {
  item: TableCheck
}
