import { useContext } from 'react'
import { InitializeProviderContext } from '../context'

export default function useInitialize() {
  return useContext(InitializeProviderContext)
}
