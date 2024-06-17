import React from 'react'
import { Flex } from 'antd'
import { ColumnsProps } from './types'
import DbColumn from './db-column'
import styles from './columns.module.scss'
import NoFound from '../no-found'

function Columns(props: ColumnsProps) {
  const { data } = props
  const isEmpty = !data || data.length === 0

  return isEmpty ? (
    <NoFound />
  ) : (
    <Flex className={styles.columns} vertical>
      {data.map((item) => (
        <DbColumn item={item} key={item.columnName} />
      ))}
    </Flex>
  )
}

export default Columns
