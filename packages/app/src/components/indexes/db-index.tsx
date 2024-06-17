import React from 'react'
import { Flex } from 'antd'
import { DbIndexProps } from './types'
import styles from './indexes.module.scss'

function DbIndex(props: DbIndexProps) {
  const { item } = props

  const items = [
    { className: '', value: item.indexName },
    { className: '', value: item.columnName },
  ]

  return (
    <Flex className={styles.dbIndex}>
      {items.map((record, index) => (
        <React.Fragment key={index}>{record.value && <span key={index}>{record.value}</span>}</React.Fragment>
      ))}
    </Flex>
  )
}

export default DbIndex
