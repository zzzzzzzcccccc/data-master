import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { type Update } from 'history'
import { history } from '../../utils'
import { THEME_MODE, SIZE, DEFAULT_THEME_PRIMARY_COLOR, CLIENT_NAMES, ConnectionConfiguration } from '@dm/core'
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
  addConnectionConfigurations: Record<string, ConnectionConfiguration>
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
  addConnectionConfigurations: Object.keys(CLIENT_NAMES).reduce(
    (acc, key) => {
      acc[key] = CLIENT_NAMES[key as keyof typeof CLIENT_NAMES].defaultConfiguration as ConnectionConfiguration
      return acc
    },
    {} as AppState['addConnectionConfigurations'],
  ),
  settingsVisible: false,
  connectionConfigurations: [],
}

export const appSlice = createSlice({
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
  },
  extraReducers: (builder) => {
    const { fetchAddConnectionConfiguration } = thunks.appThunk

    builder.addCase(fetchAddConnectionConfiguration.pending, (state, action) => {
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
  },
})

export default appSlice
