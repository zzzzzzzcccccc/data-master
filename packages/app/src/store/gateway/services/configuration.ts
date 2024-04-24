import { type EndpointBuilder } from '@reduxjs/toolkit/query/react'
import { ConnectionConfiguration, URI } from '@dm/core'
import { TAG_TYPES, type BaseRPCQuery } from '../gateway'

const configuration = (build: EndpointBuilder<BaseRPCQuery, string, string>) => ({
  getConnectionConfigurations: build.query<ConnectionConfiguration[], void>({
    query: () => ({ uri: URI.store.configuration, method: 'findAll' }),
    providesTags: [TAG_TYPES.ConnectionConfiguration],
  }),
  insertConnectionConfiguration: build.mutation<
    ConnectionConfiguration,
    { client: string; configuration: Omit<ConnectionConfiguration, 'id' | 'client'> }
  >({
    query: (payload) => ({
      uri: URI.store.configuration,
      method: 'insert',
      args: [{ client: payload.client, ...payload.configuration }],
    }),
    invalidatesTags: [TAG_TYPES.ConnectionConfiguration],
  }),
  testConnection: build.mutation<
    boolean,
    { client: string; configuration: Omit<ConnectionConfiguration, 'id' | 'client'> }
  >({
    query: (payload) => ({
      uri: URI.database?.[payload.client],
      method: 'testConnection',
      args: [payload.configuration.metadata],
    }),
  }),
})

export default configuration
