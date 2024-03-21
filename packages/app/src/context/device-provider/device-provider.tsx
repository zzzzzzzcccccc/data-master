import React from 'react'
import { type DeviceProviderProps } from './types'
import Context from './context'

export default function DeviceProvider(props: DeviceProviderProps) {
  return <Context.Provider value={props.deviceInfo}>{props.children}</Context.Provider>
}
