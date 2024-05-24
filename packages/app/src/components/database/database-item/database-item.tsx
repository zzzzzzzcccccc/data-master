import React, { useLayoutEffect, useRef } from 'react'
import { Flex } from 'antd'
import { useGetDatabaseTables, useHistory } from '../../../hooks'
import DatabaseItemHeader from './database-item-header'
import DatabaseItemTableDetails from './database-item-table-details'
import { Outlet } from 'react-router-dom'
import styles from './database-item.module.scss'

function DatabaseItem() {
  const { isError, tables, tableName, tableNames, isLoading } = useGetDatabaseTables()
  const { linkToTable } = useHistory()
  const tableRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    if (tables.length === 0 || isError || isLoading) return
    if (!tableName) return linkToTable(tables[0].tableName)
    if (tableName && tableNames.indexOf(tableName) === -1) {
      return linkToTable(tables[0].tableName)
    }
  }, [linkToTable, tables, tableNames, isError, isLoading, tableName])

  return (
    <Flex className={styles.dbItemTableWrapper} vertical justify="flex-start" align="flex-start">
      {isError ? (
        'some database item error'
      ) : (
        <>
          <DatabaseItemHeader />
          <Flex className={styles.dbItemTable} ref={tableRef} justify="flex-start" align="flex-start">
            <Outlet />
            {tables.length > 0 && tableName && <DatabaseItemTableDetails />}
          </Flex>
        </>
      )}
    </Flex>
  )
}

export default DatabaseItem
