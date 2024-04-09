import React from 'react'
import { useDatabaseItemEffect } from '../../effects'
import { Spin, Flex } from 'antd'

function DatabaseItem() {
  const { tableError, tableLoading } = useDatabaseItemEffect()

  return <Spin spinning={tableLoading}>{tableError ? 'some table error' : <Flex>hello</Flex>}</Spin>
}

export default DatabaseItem
