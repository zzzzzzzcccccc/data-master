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
  setAddConnectionConfigurationsConnectionErrorForClient,
} = appSlice.actions
export const { fetchTestConnection, fetchAddConnectionConfiguration, fetchConnectionConfigurations } = thunks.appThunk
export const { fetchTables } = thunks.containerThunk

export { store, persist }
