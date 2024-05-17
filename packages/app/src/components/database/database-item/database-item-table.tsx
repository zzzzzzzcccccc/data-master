import React from 'react'
import { Flex, Table, Pagination } from 'antd'
import { Outlet } from 'react-router-dom'
import { useGetDatabaseTableDetails } from '../../../hooks'
import styles from './database-item.module.scss'

function DatabaseItemTable() {
  const { details, isLoading, handleOnPageChange } = useGetDatabaseTableDetails()

  return (
    <>
      <Flex className={styles.dbItemTableContainer} vertical justify="flex-start" align="flex-start">
        <Flex className={styles.dbItemTableInfo} vertical justify="flex-start" align="flex-start">
          <Table
            sticky
            loading={isLoading}
            columns={details.columns}
            rowKey={details.rowKey}
            dataSource={details.dataSource}
            pagination={false}
          />
        </Flex>
        {details?.pagination && details?.pagination?.total && (
          <Flex className={styles.dbItemTablePage} vertical justify="flex-start" align="flex-end">
            <Pagination {...details.pagination} showSizeChanger onChange={handleOnPageChange} />
          </Flex>
        )}
      </Flex>
      <Outlet />
    </>
  )
}

export default DatabaseItemTable
