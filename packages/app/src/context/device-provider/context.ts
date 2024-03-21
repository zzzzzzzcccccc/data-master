import { createContext } from 'react'
import { DeviceProviderProps } from './types'

const DeviceProviderContext = createContext<DeviceProviderProps['deviceInfo']>({
  platform: '',
  electronVersion: '',
  nodeVersion: '',
  chromeVersion: '',
})

export default DeviceProviderContext
