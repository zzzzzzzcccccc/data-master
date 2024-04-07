import store, { persist } from './store'
import { appSlice } from './slices'
import thunks from './thunks'

export * from './types'

export const {
  setHistoryUpdate,
  setTheme,
  setSettingsVisible,
  setCurrentAddConnectionClient,
  setAddConnectionConfigurationForClient,
} = appSlice.actions
export const { fetchTestConnection, fetchAddConnectionConfiguration } = thunks.appThunk

export { store, persist }
