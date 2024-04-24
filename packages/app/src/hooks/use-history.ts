import { useCallback } from 'react'
import { history } from '../utils'
import useGetDatabaseId from './use-get-database-id'
import useGetDatabaseTableName from './use-get-database-table-name'
import { URI_NAMESPACES } from '@dm/core'

function useHistory() {
  const databaseId = useGetDatabaseId()
  const tableName = useGetDatabaseTableName()

  const linkToTable = useCallback(
    (target: string) => {
      if (!databaseId) return
      history.push(`/${URI_NAMESPACES.database}/${databaseId}/${target}`)
    },
    [databaseId],
  )

  const linkToSqlQuery = useCallback(() => {
    if (!databaseId) return
    const url = tableName
      ? `/${URI_NAMESPACES.database}/${databaseId}/${tableName}/sql-query`
      : `/${URI_NAMESPACES.database}/${databaseId}/sql-query`
    history.push(url)
  }, [databaseId, tableName])

  return {
    linkToTable,
    linkToSqlQuery,
  }
}

export default useHistory
