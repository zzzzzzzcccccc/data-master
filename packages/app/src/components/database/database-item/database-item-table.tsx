import React from 'react'
import { Flex, Table } from 'antd'
import { Outlet } from 'react-router-dom'
import { useGetDatabaseTableDetails } from '../../../hooks'
import styles from './database-item.module.scss'

function DatabaseItemTable() {
  const { details } = useGetDatabaseTableDetails()
  return (
    <>
      <Flex className={styles.dbItemTableContainer} vertical justify="flex-start" align="flex-start">
        <Table columns={details.columns} rowKey={(_item, index) => details.rowKey || index + ''} />
      </Flex>
      <Outlet />
    </>
  )
}

export default DatabaseItemTable
