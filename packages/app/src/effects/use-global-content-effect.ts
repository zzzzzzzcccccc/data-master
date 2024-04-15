import { useRef, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { BASE_ROUTE, ASYNC_STATUS } from '@dm/core'
import { useAppSelector, useAppDispatch } from '../hooks'
import { setWh } from '../store'
import { getElementOffsetWidthHeight } from '../utils'

function useGlobalContentEffect() {
  const contentRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const { connectionConfigurationsStatus } = useAppSelector((state) => state.app)
  const dispatch = useAppDispatch()

  const loading = connectionConfigurationsStatus === ASYNC_STATUS.pending
  const error = connectionConfigurationsStatus === ASYNC_STATUS.rejected

  useLayoutEffect(() => {
    if (!contentRef.current) return
    const target = contentRef.current
    const ro = new ResizeObserver(() => dispatch(setWh(getElementOffsetWidthHeight(target))))
    ro.observe(target)
    return () => {
      ro.disconnect()
    }
  }, [dispatch])

  return {
    isBaseRoute: location.pathname === BASE_ROUTE,
    loading,
    error,
    contentRef,
  }
}

export default useGlobalContentEffect
