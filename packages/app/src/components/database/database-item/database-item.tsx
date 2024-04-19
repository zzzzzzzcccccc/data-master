import React from 'react'
import { useDatabaseItemEffect } from '../../../effects'
import { Flex } from 'antd'
import DatabaseItemHeader from './database-item-header'
import DatabaseItemTable from './database-item-table'
import { Outlet } from 'react-router-dom'

function DatabaseItem() {
  const { tableError } = useDatabaseItemEffect()

  if (tableError) return 'some database item error'

  return (
    <Flex className="w100 h100" vertical justify="flex-start" align="flex-start">
      <DatabaseItemHeader />
      <DatabaseItemTable />
      <Outlet />
    </Flex>
  )
}

export default DatabaseItem
