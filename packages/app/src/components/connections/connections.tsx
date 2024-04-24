import React from 'react'
import { Spin, Flex } from 'antd'
import { ConnectionConfiguration, BASE_ROUTE, URI_NAMESPACES } from '@dm/core'
import ConnectionItem from './connection-item'
import { useGetDatabaseConfiguration, useTheme } from '../../hooks'
import { history } from '../../utils'

function Connections() {
  const { databaseId, configurations, isLoading, isError } = useGetDatabaseConfiguration()
  const {
    theme: { size },
  } = useTheme()

  const handleOnClick = (item: ConnectionConfiguration) => () => {
    if (databaseId !== item.id) {
      history.push(`${BASE_ROUTE}${URI_NAMESPACES.database}/${item.id}`)
    }
  }

  return (
    <Spin spinning={isLoading}>
      {isError ? (
        'connections error'
      ) : (
        <Flex style={{ width: 200 }} vertical justify="flex-start" align="flex-start" gap={size}>
          {configurations.map((item) => (
            <ConnectionItem onClick={handleOnClick(item)} item={item} key={item.id} active={databaseId === item.id} />
          ))}
        </Flex>
      )}
    </Spin>
  )
}

export default Connections
