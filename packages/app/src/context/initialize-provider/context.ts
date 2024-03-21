import { createContext } from 'react'
import { type IInitializeProviderContext } from './types'

const InitializeProviderContext = createContext<IInitializeProviderContext>({})

export default InitializeProviderContext
