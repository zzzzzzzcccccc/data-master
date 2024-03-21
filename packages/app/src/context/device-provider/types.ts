import React from 'react'
import { type DeviceInfo } from '@db-gui/core'

export interface DeviceProviderProps {
  deviceInfo: DeviceInfo
  children?: React.ReactNode
}
