import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { type Update } from 'history'
import { history } from '../../utils'
import { THEME_MODE, SIZE, DEFAULT_THEME_PRIMARY_COLOR, CLIENT_NAMES, ConnectionConfiguration } from '@dm/core'
import { i18nConfig } from '../../config'

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
  addConnectionConfigurations: Record<string, ConnectionConfiguration>
  resetAddConnectionConfigurationsAt: Record<string, string>
  addConnectionConfigurationsError: Record<string, boolean>
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
  addConnectionConfigurations: Object.keys(CLIENT_NAMES).reduce(
    (acc, key) => {
      acc[key] = CLIENT_NAMES[key as keyof typeof CLIENT_NAMES].defaultConfiguration as ConnectionConfiguration
      return acc
    },
    {} as AppState['addConnectionConfigurations'],
  ),
  resetAddConnectionConfigurationsAt: {},
  addConnectionConfigurationsError: {},
  settingsVisible: false,
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setHistoryUpdate(state, action: PayloadAction<Update>) {
      state.historyUpdate = action.payload
    },
    setTheme(state, action: PayloadAction<Partial<AppState['theme']>>) {
      if (action.payload.lang && action.payload.lang !== state.theme.lang) {
        i18nConfig.changeLanguage(action.payload.lang)
      }
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
    setAddConnectionConfigurationErrorForClient(state, action: PayloadAction<{ client: string; target: boolean }>) {
      const { client, target } = action.payload
      state.addConnectionConfigurationsError[client] = target
    },
    resetAddConnectionConfiguration(state, action: PayloadAction<{ client: string }>) {
      const { client } = action.payload
      state.addConnectionConfigurations[client] = CLIENT_NAMES[client as keyof typeof CLIENT_NAMES]
        .defaultConfiguration as ConnectionConfiguration
      state.addConnectionConfigurationsError[client] = false
      state.resetAddConnectionConfigurationsAt[client] = new Date().toISOString()
    },
  },
})

export default appSlice
