import { useCallback } from 'react'
import { history } from '../utils'
import useGetDatabaseId from './use-get-database-id'
import useGetDatabaseTableName from './use-get-database-table-name'
import { URI_NAMESPACES, BASE_ROUTE } from '@dm/core'

function useHistory() {
  const databaseId = useGetDatabaseId()
  const tableName = useGetDatabaseTableName()

  const linkToDatabase = useCallback((id = '') => {
    history.push(`${BASE_ROUTE}${URI_NAMESPACES.database}${id ? `/${id}` : ''}`)
  }, [])

  const linkToTable = useCallback(
    (target: string) => {
      if (!databaseId) return
      history.push(`${BASE_ROUTE}${URI_NAMESPACES.database}/${databaseId}/${target}`)
    },
    [databaseId],
  )

  const linkToSqlQuery = useCallback(() => {
    if (!databaseId) return
    const url = tableName
      ? `${BASE_ROUTE}${URI_NAMESPACES.database}/${databaseId}/${tableName}/sql-query`
      : `${BASE_ROUTE}${URI_NAMESPACES.database}/${databaseId}/sql-query`
    history.push(url)
  }, [databaseId, tableName])

  const back = useCallback(() => {
    history.go(-1)
  }, [])

  return {
    linkToDatabase,
    linkToTable,
    linkToSqlQuery,
    back,
  }
}

export default useHistory
