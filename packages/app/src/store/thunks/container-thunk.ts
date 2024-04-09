import { createAsyncThunk } from '@reduxjs/toolkit'
import { rpcRequest } from '../../utils'
import { URI, ConnectionConfiguration } from '@dm/core'

const fetchTables = createAsyncThunk('container/fetchTables', (payload: ConnectionConfiguration) => {
  if (!payload) return Promise.reject(new Error('No found connection configuration'))
  return rpcRequest<string[]>(URI.database?.[payload.client], 'getTables', payload.metadata)
})

export default { fetchTables }
