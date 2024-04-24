import useGetDatabaseTableName from './use-get-database-table-name'

function useGetDatabaseTable() {
  const table = useGetDatabaseTableName()

  return {
    table,
  }
}

export default useGetDatabaseTable
