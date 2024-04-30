import { useMemo } from 'react'
import useGetDatabaseConfiguration from './use-get-database-configuration'
import useGetDatabaseTableName from './use-get-database-table-name'
import { gatewayApi } from '../store'

const { useGetTablesQuery } = gatewayApi

function useGetDatabaseTables() {
  const { configuration, databaseId, configurations } = useGetDatabaseConfiguration()
  const { data = [], isLoading, isError } = useGetTablesQuery(configuration)
  const tableName = useGetDatabaseTableName()

  const tables = useMemo(() => data || [], [data])
  const tableNames = useMemo(() => tables.map((item) => item.tableName), [tables])

  return {
    configuration,
    databaseId,
    configurations,
    isLoading,
    isError,
    tables,
    tableName,
    tableNames,
  }
}

export default useGetDatabaseTables
