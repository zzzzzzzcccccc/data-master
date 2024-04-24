import React from 'react'
import { Button } from 'antd'
import Icon from '../icon'
import { ConnectionItemProps } from './types'

function ConnectionItem(props: ConnectionItemProps) {
  const { active = false, item, onClick } = props

  const handlerOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    onClick?.(event)
  }

  return (
    <Button
      style={{ width: '100%', textAlign: 'left' }}
      type={active ? 'primary' : 'default'}
      icon={<Icon target="icon-mysql" />}
      onClick={handlerOnClick}
    >
      {item.name}
    </Button>
  )
}

export default ConnectionItem
