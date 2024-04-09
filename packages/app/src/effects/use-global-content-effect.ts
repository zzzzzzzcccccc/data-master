import { useLocation } from 'react-router-dom'
import { BASE_ROUTE, ASYNC_STATUS } from '@dm/core'
import { useAppSelector } from '../hooks'

function useGlobalContentEffect() {
  const location = useLocation()
  const { connectionConfigurationsStatus } = useAppSelector((state) => state.app)

  const loading = connectionConfigurationsStatus === ASYNC_STATUS.pending
  const error = connectionConfigurationsStatus === ASYNC_STATUS.rejected

  return {
    isBaseRoute: location.pathname === BASE_ROUTE,
    loading,
    error,
  }
}

export default useGlobalContentEffect
