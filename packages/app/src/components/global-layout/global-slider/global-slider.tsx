import React from 'react'
import { Flex } from 'antd'
import styles from '../global-layout.module.scss'
import { useTheme } from '../../../hooks'

function GlobalSlider() {
  const { colorPrimary } = useTheme()

  return (
    <Flex
      className={styles.slider}
      vertical
      justify="flex-start"
      align="flex-start"
      style={{ backgroundColor: colorPrimary }}
    >
      <Flex vertical justify="center" align="center">
        Plus
      </Flex>
    </Flex>
  )
}

export default GlobalSlider
