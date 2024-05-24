import React from 'react'
import { useGetDatabaseTableDetails } from '../../../hooks'
import { Flex, Spin } from 'antd'
import DatabaseItemTableDetailsColumns from './database-item-table-details-columns'
import styles from './database-item.module.scss'

function DatabaseItemTableDetails() {
  const { tableDetailWidth, isLoadingTableDetail } = useGetDatabaseTableDetails()

  return (
    <Flex vertical className={styles.dbItemTableDetails} style={{ width: tableDetailWidth }}>
      <Spin spinning={isLoadingTableDetail}>
        <Flex className={styles.dbItemTableDetailsInfo} vertical>
          <DatabaseItemTableDetailsColumns />
        </Flex>
      </Spin>
    </Flex>
  )
}

export default DatabaseItemTableDetails
