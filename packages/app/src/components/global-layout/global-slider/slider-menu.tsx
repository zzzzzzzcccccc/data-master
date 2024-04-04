import React from 'react'
import { SliderMenuProps } from '../types'
import { Button, Tooltip, Popover } from 'antd'
import Icon from '../../icon'

function SliderMenu(props: SliderMenuProps) {
  const { icon, title, onClick, children, content } = props

  const handlerOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    onClick?.(event)
  }

  const button = (
    <Button type="primary" shape="circle" icon={<Icon target={icon} />} onClick={handlerOnClick}>
      {children}
    </Button>
  )

  if (!content) {
    return (
      <Tooltip title={title} placement="right">
        {button}
      </Tooltip>
    )
  }

  return (
    <Popover content={content} title={title} placement="rightTop" trigger="click" destroyTooltipOnHide>
      {button}
    </Popover>
  )
}

export default SliderMenu
