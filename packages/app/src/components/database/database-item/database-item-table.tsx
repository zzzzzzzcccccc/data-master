import React from 'react'
import { Flex, Pagination } from 'antd'
import ScrollTable from '../../scroll-table'
import { Outlet } from 'react-router-dom'
import { useGetDatabaseTableDetails, useAntdTableScroll, AntdTableScrollScene } from '../../../hooks'
import styles from './database-item.module.scss'

function DatabaseItemTable() {
  const { details, isLoading, handleOnPageChange, handleOnTableChange } = useGetDatabaseTableDetails()
  const { wrapperRef, scroll } = useAntdTableScroll({ scene: AntdTableScrollScene.detail })

  return (
    <>
      <Flex className={styles.dbItemTableContainer} vertical justify="flex-start" align="flex-start">
        <ScrollTable
          wrapperRef={wrapperRef}
          isLoading={isLoading}
          columns={details.columns}
          rowKey={details.rowKey}
          dataSource={details.dataSource}
          onChange={handleOnTableChange}
          scroll={scroll}
        />
        <Flex className={styles.dbItemTablePage} vertical justify="flex-start" align="flex-end">
          <Pagination {...details.pagination} showSizeChanger onChange={handleOnPageChange} />
        </Flex>
      </Flex>
      <Outlet />
    </>
  )
}

export default DatabaseItemTable
