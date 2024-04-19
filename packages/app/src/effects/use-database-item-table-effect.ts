import { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { ASYNC_STATUS } from '@dm/core'
import { useAppSelector, useAppDispatch } from '../hooks'
import { fetchTableDetails } from '../store'

function useDatabaseItemTableEffect() {
  const { databaseId = '' } = useParams<{ databaseId?: string }>()
  const { connectionConfigurations } = useAppSelector((state) => state.app)
  const { tables, tableDetails } = useAppSelector((state) => state.container)
  const dispatch = useAppDispatch()

  const databaseItem = connectionConfigurations.find((item) => item.id === databaseId)
  const tableItem = useMemo(() => tables?.[databaseId] || {}, [tables, databaseId])
  const tableDetail = tableDetails?.[tableItem?.active] || {}
  const loading = tableDetail?.status === ASYNC_STATUS.pending

  useEffect(() => {
    if (databaseItem && tableItem?.status === ASYNC_STATUS.fulfilled && tableItem?.active) {
      dispatch(
        fetchTableDetails({
          configuration: databaseItem,
          table: tableItem.active,
        }),
      )
    }
  }, [tableItem, databaseItem, dispatch])

  return {
    loading,
  }
}

export default useDatabaseItemTableEffect
