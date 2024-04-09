import React from 'react'
import { Spin, Flex } from 'antd'
import { ASYNC_STATUS } from '@dm/core'
import ConnectionItem from './connection-item'
import { useConnectionsEffect } from '../../effects'

function Connections() {
  const { loading, error, size, connectionConfigurations, databaseId, handleOnClick, tables } = useConnectionsEffect()

  return (
    <Spin spinning={loading}>
      {error ? (
        'connections error'
      ) : (
        <Flex style={{ width: 200 }} vertical justify="flex-start" align="flex-start" gap={size}>
          {connectionConfigurations.map((item) => (
            <ConnectionItem
              onClick={handleOnClick(item)}
              item={item}
              key={item.id}
              loading={tables[item.id]?.status === ASYNC_STATUS.pending}
              active={databaseId === item.id}
            />
          ))}
        </Flex>
      )}
    </Spin>
  )
}

export default Connections
