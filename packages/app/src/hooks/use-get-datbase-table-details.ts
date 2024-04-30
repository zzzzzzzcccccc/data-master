import { useMemo } from 'react'
import { TableDetails } from '@dm/core'
import useGetDatabaseConfiguration from './use-get-database-configuration'
import useGetDatabaseTableName from './use-get-database-table-name'
import { gatewayApi } from '../store'

const { useGetTableDetailQuery } = gatewayApi

function buildTableProps(details: TableDetails) {
  return {
    columns: details.columns.map((item) => ({
      key: item.columnName,
      title: item.columnName,
      dataIndex: item.columnName,
    })),
    rowKey: details.columns.find((item) => item.columnIsPrimaryKey)?.columnName,
  }
}

function useGetDatabaseTableDetails() {
  const tableName = useGetDatabaseTableName()
  const { configuration } = useGetDatabaseConfiguration()
  const { data, isLoading, isError } = useGetTableDetailQuery({ configuration, table: tableName })

  const details = useMemo(() => {
    const defaultValue = {
      name: '',
      columns: [],
      indexes: [],
      foreign: [],
      checks: [],
    }
    if (!tableName || isLoading || isError) {
      return {
        origin: defaultValue,
        ...buildTableProps(defaultValue),
      }
    }

    return {
      origin: data || defaultValue,
      ...buildTableProps(data || defaultValue),
    }
  }, [tableName, isLoading, isError, data])

  return {
    tableName,
    details,
    isLoading,
    isError,
  }
}

export default useGetDatabaseTableDetails
