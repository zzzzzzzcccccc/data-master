import React from 'react'
import { DrawerProps } from 'antd'

export interface RouteDrawerProps {
  title?: DrawerProps['title']
  getContainer?: DrawerProps['getContainer']
  width?: DrawerProps['width']
  height?: DrawerProps['height']
  rootStyle?: DrawerProps['rootStyle']
  classNames?: DrawerProps['classNames']
  extra?: DrawerProps['extra']
  children: React.ReactNode
}
