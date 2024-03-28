import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type Update } from 'history'
import { history } from '../../utils'
import { THEME_MODE, SIZE, DEFAULT_THEME_PRIMARY_COLOR } from '@db-gui/core'

export interface AppState {
  historyUpdate: Update
  theme: {
    lang: string
    mode: THEME_MODE
    primaryColor: string
    size: SIZE
  }
  settingsVisible: boolean
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
  settingsVisible: false,
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
    setSettingsVisible(state, action: PayloadAction<boolean>) {
      state.settingsVisible = action.payload
    },
  },
})

export default appSlice
