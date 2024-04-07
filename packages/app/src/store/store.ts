import { configureStore, combineReducers, type Middleware, type Reducer } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  type PersistConfig,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { appSlice } from './slices'
import { createLogger } from 'redux-logger'
import { APP_NAME, STORE_VERSION } from '@dm/core'
import { RootState } from './types'

const middleware: Middleware[] = [
  createLogger({
    collapsed: true,
  }),
]
const persistConfig: Record<string, { reducer: Reducer; config?: Omit<PersistConfig<RootState>, 'key'> }> = {
  app: {
    reducer: appSlice.reducer,
    config: {
      version: STORE_VERSION,
      storage,
      whitelist: ['theme'],
    },
  },
}

const store = configureStore({
  reducer: combineReducers(
    Object.keys(persistConfig).reduce(
      (acc, key) => {
        const configuration = persistConfig[key]
        if (configuration.config) {
          acc[key] = persistReducer({ ...configuration.config, key: `${APP_NAME}_${key}` }, configuration.reducer)
        } else {
          acc[key] = configuration.reducer
        }
        return acc
      },
      {} as Record<string, Reducer>,
    ),
  ),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(middleware),
})

const persist = persistStore(store)

export { persist }

export default store
