import { useMemo } from 'react'
import { TableDetails, PAGE_SIZE_MAPPER, SORT_TYPE } from '@dm/core'
import { useAppSelector, useAppDispatch } from './use-store'
import useGetDatabaseConfiguration from './use-get-database-configuration'
import useGetDatabaseTableName from './use-get-database-table-name'
import { gatewayApi, setTableQuery } from '../store'
import { type SorterResult, type TablePaginationConfig, type FilterValue } from 'antd/es/table/interface'

const { useGetTableDetailQuery, useGetTableDataQuery } = gatewayApi

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
          ellipsis: true,
          sorter: true,
          width: 150,
        },
      ]
      return acc
    },
    { columns: [] as Record<string, unknown>[], rowKey: '' },
  )

  return {
    columns,
    rowKey,
    dataSource: tableData?.data,
    pagination: {
      current: query.pageIndex,
      pageSize: query.pageSize,
      total: tableData?.total ? +tableData.total : 0,
      pageSizeOptions: Object.values(PAGE_SIZE_MAPPER),
    },
  }
}

function useGetDatabaseTableDetails() {
  const tableName = useGetDatabaseTableName()
  const dispatch = useAppDispatch()
  const { tableQuery, tableDetailWidth, wh } = useAppSelector((state) => state.container)

  const { configuration } = useGetDatabaseConfiguration()
  const {
    data: tableDetail,
    isFetching: isLoadingTableDetail,
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
        sorts: [],
        pageIndex: 1,
        pageSize: PAGE_SIZE_MAPPER['5000'],
        tableName,
      }
    }
  }, [tableQuery, tableName])
  const {
    data: tableData,
    isFetching: isLoadingTableData,
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

  const handleOnPageChange = (page: number, pageSize: number) => {
    const currentPageSize = query.pageSize
    const payload = {
      id: tableName,
      target: currentPageSize !== pageSize ? { pageIndex: 1, pageSize } : { pageIndex: page, pageSize },
    }
    dispatch(setTableQuery(payload))
  }

  const handleOnTableChange = (
    _p: TablePaginationConfig,
    _f: Record<string, FilterValue | null>,
    sorter: SorterResult<Record<string, unknown>>[],
  ) => {
    const result = sorter.map((item) => ({
      type: item.order === 'ascend' ? SORT_TYPE.asc : SORT_TYPE.desc,
      field: item.field as string,
    }))
    dispatch(setTableQuery({ id: tableName, target: { sorts: result } }))
  }

  return {
    tableName,
    wh,
    details,
    query,
    isLoading,
    isError,
    isLoadingTableDetail,
    tableDetailWidth,
    tableDetail,
    handleOnPageChange,
    handleOnTableChange,
  }
}

export default useGetDatabaseTableDetails
