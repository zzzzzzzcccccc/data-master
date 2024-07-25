import React, { useMemo } from 'react'
import { Table, Flex } from 'antd'
import { ScrollTableProps } from './types'
import { jsonToString } from '@dm/core'
import styles from './scroll-table.module.scss'
import { type FilterValue, type SorterResult, type TablePaginationConfig } from 'antd/es/table/interface'

const ROW_KEY = '__row_key__'

function ScrollTable(props: ScrollTableProps) {
  const {
    isLoading = false,
    wrapperRef,
    scroll,
    rowKey = '',
    columns = [],
    dataSource = [],
    onChange,
    hiddenTopBorder = true,
  } = props

  const fieldKey = useMemo(() => {
    if (!rowKey) {
      return ROW_KEY
    }
    return rowKey
  }, [rowKey])

  const data = useMemo(() => {
    if (!rowKey) {
      return dataSource.map((item, index) => ({ ...item, [ROW_KEY]: jsonToString(item, index.toString()) }))
    }
    return dataSource
  }, [dataSource, rowKey])

  const handleOnTableChange = (
    _p: TablePaginationConfig,
    _f: Record<string, FilterValue | null>,
    sorter: SorterResult<Record<string, unknown>> | SorterResult<Record<string, unknown>>[],
  ) => {
    onChange?.(_p, _f, Array.isArray(sorter) ? sorter : [sorter])
  }

  const className = [styles.scrollTableWrapper, hiddenTopBorder ? styles.hiddenTopBorder : ''].join(' ')

  return (
    <Flex className={className} vertical justify="flex-start" align="flex-start" ref={wrapperRef}>
      <Table
        loading={isLoading}
        onChange={handleOnTableChange}
        columns={columns}
        rowKey={fieldKey}
        dataSource={data}
        pagination={false}
        scroll={scroll}
        bordered
        virtual
      />
    </Flex>
  )
}

export default ScrollTable
