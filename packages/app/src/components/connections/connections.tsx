import React from 'react'
import { Spin, Flex } from 'antd'
import { ConnectionConfiguration } from '@dm/core'
import ConnectionItem from './connection-item'
import {
  useGetDatabaseConfiguration,
  useTheme,
  useDeleteConnectionConfigurationMutation,
  useHistory,
} from '../../hooks'
import styles from './connections.module.scss'

function Connections() {
  const { databaseId, configurations, isLoading, isError } = useGetDatabaseConfiguration()
  const [deleteConnectionConfiguration] = useDeleteConnectionConfigurationMutation()
  const {
    theme: { size },
  } = useTheme()
  const { linkToDatabase } = useHistory()

  const handleOnClick = (item: ConnectionConfiguration) => () => {
    if (databaseId !== item.id) {
      linkToDatabase(item.id)
    }
  }

  const handleOnRemove = (item: ConnectionConfiguration) => async () => {
    const active = item.id === databaseId
    const result = await deleteConnectionConfiguration(item.id)
    if (result?.data) {
      if (active) {
        linkToDatabase()
      }
    }
  }

  return (
    <Spin spinning={isLoading}>
      {isError ? (
        'connections error'
      ) : (
        <Flex className={styles.connectionsWrapper} vertical justify="flex-start" align="flex-start" gap={size}>
          {configurations.map((item) => (
            <ConnectionItem
              onClick={handleOnClick(item)}
              onRemove={handleOnRemove(item)}
              item={item}
              key={item.id}
              active={databaseId === item.id}
            />
          ))}
        </Flex>
      )}
    </Spin>
  )
}

export default Connections
