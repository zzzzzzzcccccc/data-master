import React from 'react'
import styles from '../global-layout.module.scss'
import { Flex, Spin } from 'antd'
import { Outlet } from 'react-router-dom'
import { GlobalContentEmpty } from '../../empty'
import { useGlobalContentEffect } from '../../../effects'

function GlobalContent() {
  const { contentRef, error, loading, isBaseRoute } = useGlobalContentEffect()

  const renderLoading = () => {
    if (!loading) return null
    return (
      <Flex className="w100 h100" vertical justify="center" align="center">
        <Spin />
      </Flex>
    )
  }

  const renderError = () => {
    if (!error) return null
    return 'some global content error'
  }

  const renderContent = () => {
    if (error || loading) return null
    return isBaseRoute ? <GlobalContentEmpty /> : <Outlet />
  }

  return (
    <Flex ref={contentRef} className={styles.content} vertical justify="flex-start" align="flex-start" flex={1}>
      {renderLoading()}
      {renderError()}
      {renderContent()}
    </Flex>
  )
}

export default GlobalContent
