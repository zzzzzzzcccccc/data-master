import React from 'react'
import { Flex } from 'antd'
import { ForeignerProps } from './types'
import styles from './foreigner.module.scss'
import NoFound from '../no-found'
import DbForeign from './db-foreign'

function Foreigner(props: ForeignerProps) {
  const { data } = props
  const isEmpty = !data || data.length === 0

  return isEmpty ? (
    <NoFound />
  ) : (
    <Flex className={styles.foreigner} vertical>
      {data.map((item) => (
        <DbForeign key={item.columnName} item={item} />
      ))}
    </Flex>
  )
}

export default Foreigner
