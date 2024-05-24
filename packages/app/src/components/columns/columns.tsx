import React from 'react'
import { Flex } from 'antd'
import { ColumnsProps } from './types'
import Icon from '../icon'
import { useTheme } from '../../hooks'
import styles from './columns.module.scss'

function Columns(props: ColumnsProps) {
  const { data } = props
  const { theme } = useTheme()

  return (
    <Flex vertical className="w100">
      {data.map((item) => (
        <Flex className={styles.dbItem} key={item.columnName} title={item.columnName}>
          <Icon target="icon-db_field" style={{ color: item.columnIsPrimaryKey ? theme.primaryColor : 'inherit' }} />
          <span style={{ paddingLeft: 'var(--dm-spacing-2)' }}>{item.columnName}</span>
        </Flex>
      ))}
    </Flex>
  )
}

export default Columns
