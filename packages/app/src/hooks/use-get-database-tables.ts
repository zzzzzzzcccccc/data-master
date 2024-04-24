import useGetDatabaseConfiguration from './use-get-database-configuration'
import useGetDatabaseTableName from './use-get-database-table-name'
import { gatewayApi } from '../store'

const { useGetTablesQuery } = gatewayApi

function useGetDatabaseTables() {
  const { configuration, databaseId, configurations } = useGetDatabaseConfiguration()
  const { data = [], isLoading, isError } = useGetTablesQuery(configuration)
  const tableName = useGetDatabaseTableName()

  return {
    configuration,
    databaseId,
    configurations,
    isLoading,
    isError,
    tables: data,
    tableName,
  }
}

export default useGetDatabaseTables
