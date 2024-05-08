import React from 'react'
import { Flex, Table } from 'antd'
import { Outlet } from 'react-router-dom'
import { useGetDatabaseTableDetails } from '../../../hooks'
import styles from './database-item.module.scss'

function DatabaseItemTable() {
  const { details, isLoading, wh, tableDetailWidth } = useGetDatabaseTableDetails()

  return (
    <>
      <Flex className={styles.dbItemTableContainer} vertical justify="flex-start" align="flex-start">
        <div className={styles.dbItemTableContainerInfo}>
          <Table
            loading={isLoading}
            columns={details.columns}
            rowKey={details.rowKey}
            dataSource={details.dataSource}
            pagination={false}
            scroll={{ x: wh[0] - tableDetailWidth, y: 300 }}
            bordered
          />
        </div>
      </Flex>
      <Outlet />
    </>
  )
}

export default DatabaseItemTable
