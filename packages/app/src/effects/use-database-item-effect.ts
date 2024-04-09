import { useTimeoutEffect, useAppSelector, useAppDispatch } from '../hooks'
import { ASYNC_STATUS, ConnectionConfiguration } from '@dm/core'
import { fetchTables } from '../store'
import { useParams } from 'react-router-dom'

function useDatabaseItemEffect() {
  const { databaseId = '' } = useParams<{ databaseId: string }>()
  const { connectionConfigurations } = useAppSelector((state) => state.app)
  const { tables } = useAppSelector((state) => state.container)
  const dispatch = useAppDispatch()

  const tableStatus = tables[databaseId]?.status
  const tableLoading = !tableStatus || tableStatus === ASYNC_STATUS.pending
  const tableError = tableStatus === ASYNC_STATUS.rejected
  const tableList = tables[databaseId]?.value || []

  useTimeoutEffect(() => {
    dispatch(
      fetchTables({
        ...connectionConfigurations.find((item) => item.id === databaseId),
        id: databaseId,
      } as ConnectionConfiguration),
    )
  })

  return {
    tableLoading,
    tableError,
    tableList,
  }
}

export default useDatabaseItemEffect
