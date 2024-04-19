import { createAsyncThunk } from '@reduxjs/toolkit'
import { rpcRequest } from '../../utils'
import { URI, ConnectionConfiguration } from '@dm/core'

const fetchTables = createAsyncThunk('container/fetchTables', (payload: ConnectionConfiguration) => {
  if (!payload) return Promise.reject(new Error('No found connection configuration'))
  return rpcRequest<string[]>(URI.database?.[payload.client], 'getTables', payload.metadata)
})

const fetchRunSql = createAsyncThunk(
  'container/fetchRunSql',
  (payload: { configuration: ConnectionConfiguration; code: string }) => {
    if (!payload || !payload.configuration) return Promise.reject(new Error('No found connection configuration'))
    if (!payload.code) return Promise.reject(new Error('No found sql code'))
    return rpcRequest(
      URI.database?.[payload.configuration.client],
      'runSql',
      payload.configuration.metadata,
      payload.code,
    )
  },
)

const fetchTableDetails = createAsyncThunk(
  'container/fetchTableDetails',
  (payload: { configuration: ConnectionConfiguration; table: string }) => {
    if (!payload || !payload.configuration) return Promise.reject(new Error('No found connection configuration'))
    if (!payload.table) return Promise.reject(new Error('No found table name'))
    return rpcRequest(
      URI.database?.[payload.configuration.client],
      'getTableInfo',
      payload.configuration.metadata,
      payload.table,
    )
  },
)

export default { fetchTables, fetchRunSql, fetchTableDetails }
