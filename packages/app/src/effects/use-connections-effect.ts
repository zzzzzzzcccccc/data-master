import { useAppDispatch, useAppSelector, useTheme } from '../hooks'
import { fetchTables } from '../store'
import { ConnectionConfiguration, ASYNC_STATUS, BASE_ROUTE, URI_NAMESPACES } from '@dm/core'
import { useParams } from 'react-router-dom'
import { history } from '../utils'

function useConnectionsEffect() {
  const { databaseId } = useParams<{ databaseId: string }>()
  const { size } = useTheme()
  const { connectionConfigurationsStatus, connectionConfigurations } = useAppSelector((state) => state.app)
  const { tables } = useAppSelector((state) => state.container)
  const dispatch = useAppDispatch()
  const loading = connectionConfigurationsStatus === ASYNC_STATUS.pending
  const error = connectionConfigurationsStatus === ASYNC_STATUS.rejected

  const handleOnClick = (item: ConnectionConfiguration) => () => {
    if (databaseId !== item.id) {
      dispatch(fetchTables(item))
      history.push(`${BASE_ROUTE}${URI_NAMESPACES.database}/${item.id}`)
    }
  }

  return {
    databaseId,
    size,
    connectionConfigurations,
    tables,
    loading,
    error,
    handleOnClick,
  }
}

export default useConnectionsEffect
