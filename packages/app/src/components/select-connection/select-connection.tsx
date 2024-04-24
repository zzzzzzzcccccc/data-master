import React from 'react'
import { Flex, Button, Popover } from 'antd'
import { CLIENT_NAMES } from '@dm/core'
import Icon from '../icon'
import ConnectionForm from '../connection-form'
import { useAppDispatch, useAppSelector, useTheme, useTranslation } from '../../hooks'
import { setCurrentAddConnectionClient } from '../../store'

function SelectConnection() {
  const t = useTranslation()
  const {
    theme: { size },
  } = useTheme()
  const { currentAddConnectionClient } = useAppSelector((state) => state.app)
  const dispatch = useAppDispatch()
  const list = Object.keys(CLIENT_NAMES).map((key) => {
    const item = CLIENT_NAMES[key as keyof typeof CLIENT_NAMES]
    return {
      key,
      icon: item.icon,
      label: t(key),
    }
  })

  const handleOnClick = (client: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    dispatch(setCurrentAddConnectionClient(client))
  }

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
