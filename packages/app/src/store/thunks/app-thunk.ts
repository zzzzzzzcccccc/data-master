import { createAsyncThunk } from '@reduxjs/toolkit'
import { URI, ConnectionConfiguration } from '@dm/core'
import { getPreloadInjector } from '../../utils'

const { rpcRequest } = getPreloadInjector()

const fetchAddConnectionConfiguration = createAsyncThunk(
  'app/fetchAddConnectionConfiguration',
  async (payload: { client: string; configuration: Omit<ConnectionConfiguration, 'id' | 'client'> }) => {
    const response = await rpcRequest<ConnectionConfiguration>(URI.configuration, 'insert', {
      ...payload.configuration,
      client: payload.client,
    })
    if (response?.error) {
      return Promise.reject(new Error(response.error as string))
    }
    return response?.data
  },
)

export default {
  fetchAddConnectionConfiguration,
}
