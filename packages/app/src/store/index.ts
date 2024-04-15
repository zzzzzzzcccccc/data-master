import store, { persist } from './store'
import { appSlice, containerSlice } from './slices'
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
export const { setWh, setSqlRunCode } = containerSlice.actions
export const { fetchTestConnection, fetchAddConnectionConfiguration, fetchConnectionConfigurations } = thunks.appThunk
export const { fetchTables } = thunks.containerThunk

export { store, persist }
