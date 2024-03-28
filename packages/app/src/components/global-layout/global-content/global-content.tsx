import React from 'react'
import styles from '../global-layout.module.scss'
import { Flex } from 'antd'
import { Outlet, useLocation } from 'react-router-dom'
import { GlobalContentEmpty } from '../../empty'
import { BASE_ROUTE } from '@db-gui/core'

function GlobalContent() {
  const location = useLocation()
  const isBaseRoute = location.pathname === BASE_ROUTE

  return (
    <Flex className={styles.content} vertical justify="flex-start" align="flex-start" flex={1}>
      {isBaseRoute && <GlobalContentEmpty />}
      <Outlet />
    </Flex>
  )
}

export default GlobalContent
