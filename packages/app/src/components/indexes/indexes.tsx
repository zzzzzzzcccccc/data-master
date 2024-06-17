import React from 'react'
import { Flex } from 'antd'
import { type IndexesProps } from './types'
import NoFound from '../no-found'
import DbIndex from './db-index'
import styles from './indexes.module.scss'

function Indexes(props: IndexesProps) {
  const { data } = props
  const isEmpty = !data || data.length === 0

  return isEmpty ? (
    <NoFound />
  ) : (
    <Flex className={styles.indexes} vertical>
      {data.map((item) => (
        <DbIndex key={item.columnName} item={item} />
      ))}
    </Flex>
  )
}

export default Indexes
