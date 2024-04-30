import React, { useLayoutEffect } from 'react'
import { Flex } from 'antd'
import { useGetDatabaseTables, useHistory } from '../../../hooks'
import DatabaseItemHeader from './database-item-header'
import DatabaseItemTableDetails from './database-item-table-details'
import { Outlet } from 'react-router-dom'
import styles from './database-item.module.scss'

function DatabaseItem() {
  const { isError, tables, tableName, tableNames, isLoading } = useGetDatabaseTables()
  const { linkToTable } = useHistory()

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
          <Flex className={styles.dbItemTable} justify="flex-start" align="flex-start">
            {tables.length === 0 ? (
              'no tables'
            ) : (
              <>
                <Outlet />
                {tableName && <DatabaseItemTableDetails />}
              </>
            )}
          </Flex>
        </>
      )}
    </Flex>
  )
}

export default DatabaseItem
