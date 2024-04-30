import React from 'react'
import { Drawer } from 'antd'
import { RouteDrawerProps } from './types'
import { useHistory } from '../../hooks'

function RouteDrawer(props: RouteDrawerProps) {
  const { children, title, getContainer = false, width, height, rootStyle, classNames, extra } = props
  const { back } = useHistory()

  return (
    <Drawer
      open
      title={title}
      onClose={back}
      getContainer={getContainer}
      width={width}
      height={height}
      rootStyle={rootStyle}
      classNames={classNames}
      extra={extra}
    >
      {children}
    </Drawer>
  )
}

export default RouteDrawer
