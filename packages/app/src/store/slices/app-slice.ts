import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type Update } from 'history'
import { history } from '../../utils'
import { ASYNC_STATUS, THEME_MODE } from '@db-gui/core'

export interface AppState {
  status: ASYNC_STATUS
  historyUpdate: Update
  theme: {
    lang: string
    mode: THEME_MODE
  }
}

const initialState: AppState = {
  status: ASYNC_STATUS.idle,
  historyUpdate: {
    location: history.location,
    action: history.action,
  },
  theme: {
    lang: navigator.language || 'en-US',
    mode: THEME_MODE.system,
  },
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
    setStatus(state, action: PayloadAction<ASYNC_STATUS>) {
      state.status = action.payload
    },
  },
})

export default appSlice
