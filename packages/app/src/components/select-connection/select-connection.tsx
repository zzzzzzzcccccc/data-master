import React from 'react'
import { Flex, Button, Popover } from 'antd'
import { useSelectConnectionEffect } from '../../effects'
import Icon from '../icon'
import ConnectionForm from '../connection-form'

function SelectConnection() {
  const { size, list, currentAddConnectionClient, handleOnClick } = useSelectConnectionEffect()

  return (
    <Flex style={{ width: 200 }} vertical justify="flex-start" align="flex-start" gap={size}>
      {list.map((item) => (
        <Popover
          open={item.key === currentAddConnectionClient}
          key={item.key}
          content={
            <Flex vertical justify="flex-start" align="flex-start" style={{ width: 360 }}>
              <ConnectionForm client={item.key} />
            </Flex>
          }
          placement="rightTop"
        >
          <Button
            style={{ width: '100%', textAlign: 'left' }}
            type={currentAddConnectionClient === item.key ? 'primary' : 'default'}
            icon={<Icon target={item.icon} />}
            onClick={handleOnClick(item.key)}
          >
            {item.label}
          </Button>
        </Popover>
      ))}
    </Flex>
  )
}

export default SelectConnection
