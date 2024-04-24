import React, { useRef, useLayoutEffect } from 'react'
import { BASE_ROUTE } from '@dm/core'
import styles from '../global-layout.module.scss'
import { Flex, Spin } from 'antd'
import { useLocation, Outlet } from 'react-router-dom'
import { GlobalContentEmpty } from '../../empty'
import { useGetConnectionConfigurationsQuery, useAppDispatch } from '../../../hooks'
import { setWh } from '../../../store'
import { getElementOffsetWidthHeight } from '../../../utils'

function GlobalContent() {
  const contentRef = useRef<HTMLDivElement | null>(null)
  const location = useLocation()
  const { isLoading, isError } = useGetConnectionConfigurationsQuery()
  const dispatch = useAppDispatch()

  const renderLoading = () => {
    if (!isLoading) return null
    return (
      <Flex className="w100 h100" vertical justify="center" align="center">
        <Spin />
      </Flex>
    )
  }

  const renderError = () => {
    if (!isError) return null
    return 'some global content error'
  }

  const renderContent = () => {
    if (isLoading || isError) return null
    return location.pathname === BASE_ROUTE ? <GlobalContentEmpty /> : <Outlet />
  }

  useLayoutEffect(() => {
    if (!contentRef.current) return
    const target = contentRef.current
    const ro = new ResizeObserver(() => dispatch(setWh(getElementOffsetWidthHeight(target))))
    ro.observe(target)
    return () => {
      ro.disconnect()
    }
  }, [dispatch])

  return (
    <Flex ref={contentRef} className={styles.content} vertical justify="flex-start" align="flex-start" flex={1}>
      {renderLoading()}
      {renderError()}
      {renderContent()}
    </Flex>
  )
}

export default GlobalContent
