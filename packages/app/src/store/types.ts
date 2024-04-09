import { type ThunkAction, type Action } from '@reduxjs/toolkit'
import { type AppState, type ContainerState } from './slices'
import store from './store'

export type RootState = {
  app: AppState
  container: ContainerState
}

export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
