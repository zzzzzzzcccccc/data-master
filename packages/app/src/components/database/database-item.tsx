import React from 'react'
import { useDatabaseItemEffect } from '../../effects'
import { Spin, Flex } from 'antd'
import SqlEditor from '../sql-editor'

function DatabaseItem() {
  const { tableError, tableLoading } = useDatabaseItemEffect()

  if (tableError) return 'table item some error'

  return (
    <Flex
      vertical
      justify={tableLoading ? 'center' : 'flex-start'}
      align={tableLoading ? 'center' : 'flex-start'}
      style={{ width: '100%', height: '100%' }}
    >
      {tableLoading ? <Spin /> : <SqlEditor style={{ width: '100%', height: 300 }} />}
    </Flex>
  )
}

export default DatabaseItem
