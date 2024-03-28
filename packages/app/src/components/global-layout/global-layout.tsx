import React from 'react'
import { ConfigProvider, App, Flex } from 'antd'
import { useGlobalLayoutEffect } from '../../effects'
import GlobalHeader from './global-header'
import GlobalSlider from './global-slider'
import GlobalContent from './global-content'
import Settings from '../settings'
import styles from './global-layout.module.scss'

function GlobalLayout() {
  const { configProviderProps, isDark } = useGlobalLayoutEffect()

  return (
    <ConfigProvider {...configProviderProps}>
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
