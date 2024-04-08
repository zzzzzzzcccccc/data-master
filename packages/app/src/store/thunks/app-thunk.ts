import { createAsyncThunk } from '@reduxjs/toolkit'
import { URI, ConnectionConfiguration } from '@dm/core'
import { rpcRequest } from '../../utils'

const fetchTestConnection = createAsyncThunk(
  'app/fetchTestConnection',
  (payload: { client: string; configuration: Omit<ConnectionConfiguration, 'id' | 'client'> }) => {
    return rpcRequest(URI.database?.[payload.client], 'testConnection', payload.configuration?.metadata)
  },
)

const fetchAddConnectionConfiguration = createAsyncThunk(
  'app/fetchAddConnectionConfiguration',
  (payload: { client: string; configuration: Omit<ConnectionConfiguration, 'id' | 'client'> }) => {
    return rpcRequest<ConnectionConfiguration>(URI.store.configuration, 'insert', {
      ...payload.configuration,
      client: payload.client,
    })
  },
)

const fetchConnectionConfigurations = createAsyncThunk('app/fetchConnectionConfigurations', () => {
  return rpcRequest<ConnectionConfiguration[]>(URI.store.configuration, 'findAll')
})

export default {
  fetchTestConnection,
  fetchAddConnectionConfiguration,
  fetchConnectionConfigurations,
}
