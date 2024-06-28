import React from 'react'
import { Flex } from 'antd'
import Icon from '../icon'
import { DbCheckProps } from './types'
import { useTheme } from '../../hooks'
import styles from './checks.module.scss'

function DbCheck(props: DbCheckProps) {
  const { item } = props
  const { theme } = useTheme()

  const items = [
    { className: styles.checkName, value: item.constraintName },
    { className: styles.checkOther, value: item.checkClause },
  ]

  const title = items
    .map((i) => i.value)
    .filter(Boolean)
    .join(' ')

  return (
    <Flex vertical className={styles.checkItem} title={title}>
      <Flex className={styles.dbCheck} align="center" justify="flex-start" gap={theme.size}>
        <Icon target="icon-jiancha" />
        {items.map((record, index) => (
          <React.Fragment key={index}>
            {record.value && (
              <span key={index} className={record.className}>
                {record.value}
              </span>
            )}
          </React.Fragment>
        ))}
      </Flex>
    </Flex>
  )
}

export default DbCheck
