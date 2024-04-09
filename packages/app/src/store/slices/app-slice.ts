import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { type Update } from 'history'
import { history } from '../../utils'
import {
  THEME_MODE,
  SIZE,
  DEFAULT_THEME_PRIMARY_COLOR,
  CLIENT_NAMES,
  ConnectionConfiguration,
  ASYNC_STATUS,
} from '@dm/core'
import thunks from '../thunks'

export interface AppState {
  historyUpdate: Update
  theme: {
    lang: string
    mode: THEME_MODE
    primaryColor: string
    size: SIZE
  }
  settingsVisible: boolean
  currentAddConnectionClient: string
  addConnectionConfigurationsLoading: Record<string, boolean>
  addConnectionConfigurationsConnectionError: Record<string, boolean>
  addConnectionConfigurations: Record<string, ConnectionConfiguration>
  connectionConfigurationsStatus: ASYNC_STATUS
  connectionConfigurations: ConnectionConfiguration[]
}

const initialState: AppState = {
  historyUpdate: {
    location: history.location,
    action: history.action,
  },
  theme: {
    lang: navigator.language || 'en-US',
    mode: THEME_MODE.system,
    primaryColor: DEFAULT_THEME_PRIMARY_COLOR,
    size: SIZE.small,
  },
  currentAddConnectionClient: '',
  addConnectionConfigurationsLoading: Object.keys(CLIENT_NAMES).reduce(
    (acc, key) => ({ ...acc, [key]: false }),
    {} as AppState['addConnectionConfigurationsLoading'],
  ),
  addConnectionConfigurationsConnectionError: Object.keys(CLIENT_NAMES).reduce(
    (acc, key) => ({ ...acc, [key]: false }),
    {} as AppState['addConnectionConfigurationsConnectionError'],
  ),
  addConnectionConfigurations: Object.keys(CLIENT_NAMES).reduce(
    (acc, key) => {
      acc[key] = CLIENT_NAMES[key as keyof typeof CLIENT_NAMES].defaultConfiguration as ConnectionConfiguration
      return acc
    },
    {} as AppState['addConnectionConfigurations'],
  ),
  settingsVisible: false,
  connectionConfigurationsStatus: ASYNC_STATUS.pending,
  connectionConfigurations: [],
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setHistoryUpdate(state, action: PayloadAction<Update>) {
      state.historyUpdate = action.payload
    },
    setTheme(state, action: PayloadAction<Partial<AppState['theme']>>) {
      state.theme = {
        ...state.theme,
        ...action.payload,
      }
    },
    setSettingsVisible(state, action: PayloadAction<AppState['settingsVisible']>) {
      state.settingsVisible = action.payload
    },
    setCurrentAddConnectionClient(state, action: PayloadAction<AppState['currentAddConnectionClient']>) {
      state.addConnectionConfigurationsConnectionError[state.currentAddConnectionClient] = false
      state.currentAddConnectionClient = action.payload
    },
    setAddConnectionConfigurationForClient(
      state,
      action: PayloadAction<{
        client: string
        payload: Partial<ConnectionConfiguration>
        merge?: boolean
      }>,
    ) {
      const { client, payload, merge = true } = action.payload
      if (!merge) {
        state.addConnectionConfigurations[client] = payload as ConnectionConfiguration
      } else {
        state.addConnectionConfigurations[client] = {
          ...state.addConnectionConfigurations[client],
          ...payload,
          metadata: {
            ...state.addConnectionConfigurations[client].metadata,
            ...payload.metadata,
          },
        }
      }
    },
    setAddConnectionConfigurationsConnectionErrorForClient(
      state,
      action: PayloadAction<{ client: string; target: boolean }>,
    ) {
      state.addConnectionConfigurationsConnectionError[action.payload.client] = action.payload.target
    },
  },
  extraReducers: (builder) => {
    const { fetchTestConnection, fetchAddConnectionConfiguration, fetchConnectionConfigurations } = thunks.appThunk

    builder.addCase(fetchTestConnection.pending, (state, action) => {
      state.addConnectionConfigurationsLoading[action.meta.arg.client] = true
    })
    builder.addCase(fetchTestConnection.fulfilled, (state, action) => {
      state.addConnectionConfigurationsLoading[action.meta.arg.client] = false
    })
    builder.addCase(fetchTestConnection.rejected, (state, action) => {
      state.addConnectionConfigurationsLoading[action.meta.arg.client] = false
      state.addConnectionConfigurationsConnectionError[action.meta.arg.client] = true
    })

    builder.addCase(fetchAddConnectionConfiguration.pending, (state, action) => {
      state.addConnectionConfigurationsConnectionError[action.meta.arg.client] = false
      state.addConnectionConfigurationsLoading[action.meta.arg.client] = true
    })
    builder.addCase(fetchAddConnectionConfiguration.fulfilled, (state, action) => {
      if (action?.payload) {
        state.connectionConfigurations.push(action.payload)
        state.addConnectionConfigurations[action.meta.arg.client] = CLIENT_NAMES[
          action.payload.client as keyof typeof CLIENT_NAMES
        ].defaultConfiguration as ConnectionConfiguration
      }
      state.addConnectionConfigurationsLoading[action.meta.arg.client] = false
    })
    builder.addCase(fetchAddConnectionConfiguration.rejected, (state, action) => {
      state.addConnectionConfigurationsLoading[action.meta.arg.client] = false
    })

    builder.addCase(fetchConnectionConfigurations.pending, (state) => {
      state.connectionConfigurationsStatus = ASYNC_STATUS.pending
    })
    builder.addCase(fetchConnectionConfigurations.fulfilled, (state, action) => {
      state.connectionConfigurationsStatus = ASYNC_STATUS.fulfilled
      if (action.payload) {
        state.connectionConfigurations = action.payload
      }
    })
    builder.addCase(fetchConnectionConfigurations.rejected, (state) => {
      state.connectionConfigurationsStatus = ASYNC_STATUS.rejected
    })
  },
})

export default appSlice
