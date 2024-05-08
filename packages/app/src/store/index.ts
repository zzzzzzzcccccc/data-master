import store, { persist } from './store'
import { appSlice, containerSlice } from './slices'
import { gatewayApi } from './gateway'

export * from './types'

export const {
  setHistoryUpdate,
  setTheme,
  setSettingsVisible,
  setCurrentAddConnectionClient,
  setAddConnectionConfigurationForClient,
  setAddConnectionConfigurationErrorForClient,
  resetAddConnectionConfiguration,
} = appSlice.actions
export const { setWh, setTableQuery, setSqlRunCode } = containerSlice.actions
export { store, persist, gatewayApi }
