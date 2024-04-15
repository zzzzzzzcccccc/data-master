import React from 'react'
import { Drawer } from 'antd'
import { RouteDrawerProps } from './types'

function RouteDrawer(props: RouteDrawerProps) {
  const { children, title, getContainer = false, width, height, rootStyle, classNames, extra } = props

  const handleOnClose = () => {
    history.go(-1)
  }

  return (
    <Drawer
      open
      title={title}
      onClose={handleOnClose}
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
