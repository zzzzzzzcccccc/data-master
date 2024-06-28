import React from 'react'
import { Flex } from 'antd'
import { ChecksProps } from './types'
import styles from './checks.module.scss'
import DbCheck from './db-check'
import NoFound from '../no-found'

function Checks(props: ChecksProps) {
  const { data } = props
  const isEmpty = !data || data.length === 0

  return isEmpty ? (
    <NoFound />
  ) : (
    <Flex className={styles.checks} vertical>
      {data.map((item) => (
        <DbCheck item={item} key={item.constraintName} />
      ))}
    </Flex>
  )
}

export default Checks
