import { useContext } from 'react'
import { DeviceProviderContext } from '../context'

export default function useDeviceInfo() {
  return useContext(DeviceProviderContext)
}
