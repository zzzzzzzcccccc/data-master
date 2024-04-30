import React, { useRef } from 'react'
import { BASE_ROUTE } from '@dm/core'
import styles from '../global-layout.module.scss'
import { Flex, Spin } from 'antd'
import { useLocation, Outlet } from 'react-router-dom'
import { GlobalContentEmpty } from '../../empty'
import { useGetConnectionConfigurationsQuery, useAppDispatch, useResizeObserver } from '../../../hooks'
import { setWh } from '../../../store'

function GlobalContent() {
  const contentRef = useRef<HTMLDivElement | null>(null)
  const location = useLocation()
  const { isError, isLoading } = useGetConnectionConfigurationsQuery()
  const dispatch = useAppDispatch()

  const renderError = () => {
    if (!isError) return null
    return 'some global content error'
  }

  const renderContent = () => {
    if (isError) return null
    return (
      <>
        {location.pathname === BASE_ROUTE ? <GlobalContentEmpty /> : <Outlet />}
        {isLoading && (
          <Flex className={styles.contentLoading} vertical align="center" justify="center">
            <Spin spinning />
          </Flex>
        )}
      </>
    )
  }

  useResizeObserver(contentRef, (payload) => dispatch(setWh(payload)))

  return (
    <Flex ref={contentRef} className={styles.content} vertical justify="flex-start" align="flex-start" flex={1}>
      {renderError()}
      {renderContent()}
    </Flex>
  )
}

export default GlobalContent
