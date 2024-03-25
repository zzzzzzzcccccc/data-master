import { type ThunkAction, type Action } from '@reduxjs/toolkit'
import { type AppState } from './slices'
import store from './store'

export type RootState = {
  app: AppState
}

export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
