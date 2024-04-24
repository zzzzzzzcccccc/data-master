import React, { useLayoutEffect } from 'react'
import { Flex } from 'antd'
import { useGetDatabaseTables, useHistory } from '../../../hooks'
import DatabaseItemHeader from './database-item-header'
import { Outlet } from 'react-router-dom'

function DatabaseItem() {
  const { isError, tables, tableName } = useGetDatabaseTables()
  const { linkToTable } = useHistory()

  useLayoutEffect(() => {
    if (tables.length === 0 || isError) return
    if (!tableName) return linkToTable(tables[0])
    if (tableName && tables.indexOf(tableName) === -1) {
      return linkToTable(tables[0])
    }
  }, [linkToTable, tables, tableName, isError])

  if (isError) return 'some database item error'

  return (
    <Flex className="w100 h100" vertical justify="flex-start" align="flex-start">
      <DatabaseItemHeader />
      {tables.length === 0 ? 'no tables' : <Outlet />}
    </Flex>
  )
}

export default DatabaseItem
