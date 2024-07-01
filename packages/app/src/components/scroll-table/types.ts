import React from 'react'
import {
  type FilterValue,
  type SorterResult,
  type TablePaginationConfig,
  type ColumnsType,
} from 'antd/es/table/interface'

export interface ScrollTableProps {
  scroll: {
    x: number | true | string
    y: number | string
    scrollToFirstRowOnChange?: boolean
  }
  wrapperRef?: React.MutableRefObject<HTMLDivElement | null>
  isLoading?: boolean
  rowKey?: string
  columns?: ColumnsType<Record<string, unknown>>
  dataSource?: Record<string, unknown>[]
  onChange?: (
    _p: TablePaginationConfig,
    _f: Record<string, FilterValue | null>,
    sorters: SorterResult<Record<string, unknown>>[],
  ) => void
}
