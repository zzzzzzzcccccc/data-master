import { createApi } from '@reduxjs/toolkit/query/react'
import { configuration, database } from './services'
import { rpcRequest } from '../../utils'

const TAG_TYPES = {
  ConnectionConfiguration: 'ConnectionConfiguration',
} as const

const baseRPCQuery =
  () =>
  async <R>({ uri, method, args = [] }: { uri: string; method: string; args?: unknown[] }) => {
    try {
      const data = await rpcRequest<R>(uri, method, ...args)
      return { data }
    } catch (error) {
      const reason = typeof error === 'string' ? error : (error as Error)?.message
      return { error: reason || 'unknown error' }
    }
  }

const gatewayApi = createApi({
  reducerPath: 'gatewayApi',
  baseQuery: baseRPCQuery(),
  tagTypes: Object.values(TAG_TYPES),
  endpoints: (build) => ({
    ...configuration(build),
    ...database(build),
  }),
})

export type BaseRPCQuery = ReturnType<typeof baseRPCQuery>
export { TAG_TYPES, gatewayApi }
