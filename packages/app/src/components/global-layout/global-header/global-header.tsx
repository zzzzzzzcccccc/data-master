import React from 'react'
import { Flex } from 'antd'
import styles from '../global-layout.module.scss'
import { useTheme } from '../../../hooks'

function GlobalHeader() {
  const {
    theme: { primaryColor, size },
  } = useTheme()

  return (
    <Flex
      className={styles.header}
      justify="flex-start"
      align="center"
      style={{ backgroundColor: primaryColor }}
      gap={size}
    >
      <div className={styles.headerDrag} />
    </Flex>
  )
}

export default GlobalHeader
