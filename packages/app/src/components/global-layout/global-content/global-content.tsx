import React from 'react'
import styles from '../global-layout.module.scss'
import { Flex, Spin } from 'antd'
import { Outlet } from 'react-router-dom'
import { GlobalContentEmpty } from '../../empty'
import { useGlobalContentEffect } from '../../../effects'

function GlobalContent() {
  const { error, loading, isBaseRoute } = useGlobalContentEffect()

  if (error) {
    return 'global content some error'
  }

  return (
    <Flex className={styles.content} vertical justify="flex-start" align="flex-start" flex={1}>
      {loading ? (
        <Flex vertical justify="center" align="center" style={{ width: '100%', height: '100%' }}>
          <Spin />
        </Flex>
      ) : isBaseRoute ? (
        <GlobalContentEmpty />
      ) : (
        <Outlet />
      )}
    </Flex>
  )
}

export default GlobalContent
