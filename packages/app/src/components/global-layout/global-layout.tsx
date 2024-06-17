import React from 'react'
import { ConfigProvider, App, Flex } from 'antd'
import GlobalHeader from './global-header'
import GlobalSlider from './global-slider'
import GlobalContent from './global-content'
import Settings from '../settings'
import styles from './global-layout.module.scss'
import { useTheme, useGetConnectionConfigurationsQuery } from '../../hooks'
import NoFound from '../no-found'

function GlobalLayout() {
  const { isDark, configProviderProps } = useTheme()

  useGetConnectionConfigurationsQuery()

  return (
    <ConfigProvider {...configProviderProps} renderEmpty={NoFound}>
      <App className={isDark ? styles.appDark : styles.app}>
        <Flex className={styles.layout} vertical justify="flex-start" align="flex-start">
          <GlobalHeader />
          <Flex className={styles.container} justify="flex-start" align="flex-start" flex={1}>
            <GlobalSlider />
            <GlobalContent />
          </Flex>
        </Flex>
        <Settings />
      </App>
    </ConfigProvider>
  )
}

export default GlobalLayout
