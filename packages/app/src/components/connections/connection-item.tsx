import React from 'react'
import { Button, Flex } from 'antd'
import Icon from '../icon'
import { ConnectionItemProps } from './types'
import { useTheme } from '../../hooks'
import styles from './connections.module.scss'

function ConnectionItem(props: ConnectionItemProps) {
  const { active = false, item, onClick, onRemove } = props
  const {
    theme: { size },
  } = useTheme()

  const handlerOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    onClick?.(event)
  }

  const handleOnRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    onRemove?.(event)
  }

  return (
    <Flex className={styles.connectionItem} align="center" justify="center" gap={size}>
      <Flex vertical style={{ flex: 1 }}>
        <Button
          style={{ width: '100%', textAlign: 'left', flex: 1 }}
          type={active ? 'primary' : 'default'}
          icon={<Icon target="icon-mysql" />}
          onClick={handlerOnClick}
        >
          {item.name}
        </Button>
      </Flex>
      <Button type={active ? 'primary' : 'default'} onClick={handleOnRemove}>
        Remove
      </Button>
    </Flex>
  )
}

export default ConnectionItem
