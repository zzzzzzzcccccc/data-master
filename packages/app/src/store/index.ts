import store from './store'
import { appSlice } from './slices'

export * from './types'

export const { setHistoryUpdate, setTheme, setStatus } = appSlice.actions

export { store }
