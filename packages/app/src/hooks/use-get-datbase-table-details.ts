import { useMemo } from 'react'
import { TableDetails, PAGE_SIZE_MAPPER, jsonToString } from '@dm/core'
import { useAppSelector } from './use-store'
import useGetDatabaseConfiguration from './use-get-database-configuration'
import useGetDatabaseTableName from './use-get-database-table-name'
import { gatewayApi } from '../store'

const { useGetTableDetailQuery, useGetTableDataQuery } = gatewayApi
const ROW_KEY = '__row_key__'

function buildTableProps(
  details: TableDetails,
  query: { pageIndex: number; pageSize: number },
  tableData?: { data: Record<string, unknown>[]; total: string } | null,
) {
  const { columns, rowKey } = details.columns.reduce(
    (acc, item) => {
      if (item.columnIsPrimaryKey) {
        acc.rowKey = item.columnName
      }
      acc.columns = [
        ...acc.columns,
        {
          key: item.columnName,
          title: item.columnName,
          dataIndex: item.columnName,
        },
      ]
      return acc
    },
    { columns: [] as Record<string, unknown>[], rowKey: '' },
  )
  const dataSource = rowKey
    ? tableData?.data || []
    : (tableData?.data || []).map((item) => ({
        ...item,
        [ROW_KEY]: jsonToString(item),
      }))

  return {
    columns,
    rowKey: rowKey || ROW_KEY,
    dataSource,
    pagination: {
      current: query.pageIndex,
      pageSize: query.pageSize,
      total: tableData?.total ? +tableData.total : 0,
    },
  }
}

function useGetDatabaseTableDetails() {
  const tableName = useGetDatabaseTableName()
  const { tableQuery, tableDetailWidth, wh } = useAppSelector((state) => state.container)

  const { configuration } = useGetDatabaseConfiguration()
  const {
    data: tableDetail,
    isLoading: isLoadingTableDetail,
    isError: isErrorTableDetail,
  } = useGetTableDetailQuery({ configuration, table: tableName })

  const query = useMemo(() => {
    if (tableQuery?.[tableName]) {
      return {
        ...tableQuery[tableName],
        tableName,
      }
    } else {
      return {
        pageIndex: 1,
        pageSize: PAGE_SIZE_MAPPER['5000'],
        tableName,
      }
    }
  }, [tableQuery, tableName])
  const {
    data: tableData,
    isLoading: isLoadingTableData,
    isError: isErrorTableData,
  } = useGetTableDataQuery({ configuration, query })
  const details = useMemo(() => {
    const defaultValue = {
      name: '',
      columns: [],
      indexes: [],
      foreign: [],
      checks: [],
    }
    if (!tableName || isLoadingTableDetail || isErrorTableDetail) {
      return {
        origin: defaultValue,
        ...buildTableProps(defaultValue, query, tableData),
      }
    }

    return {
      origin: tableDetail || defaultValue,
      ...buildTableProps(tableDetail || defaultValue, query, tableData),
    }
  }, [tableName, isLoadingTableDetail, tableDetail, isErrorTableDetail, query, tableData])

  const isLoading = isLoadingTableDetail || isLoadingTableData
  const isError = isErrorTableDetail || isErrorTableData

  return {
    tableName,
    wh,
    details,
    query,
    isLoading,
    isError,
    tableDetailWidth,
  }
}

export default useGetDatabaseTableDetails
