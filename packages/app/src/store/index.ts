import store, { persist } from './store'
import { appSlice } from './slices'

export * from './types'

export const { setHistoryUpdate, setTheme, setSettingsVisible } = appSlice.actions

export { store, persist }
