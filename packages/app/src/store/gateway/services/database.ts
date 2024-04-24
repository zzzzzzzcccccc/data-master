import { type EndpointBuilder } from '@reduxjs/toolkit/query/react'
import { ConnectionConfiguration, URI } from '@dm/core'
import { type BaseRPCQuery } from '../gateway'
const database = (build: EndpointBuilder<BaseRPCQuery, string, string>) => ({
  getTables: build.query<string[], ConnectionConfiguration>({
    query: (payload) => ({
      uri: URI.database?.[payload.client],
      method: 'getTables',
      args: [payload.metadata],
    }),
  }),
  runSql: build.mutation<unknown, { configuration: ConnectionConfiguration; code: string }>({
    query: (payload) => ({
      uri: URI.database?.[payload.configuration.client],
      method: 'runSql',
      args: [payload.configuration.metadata, payload.code],
    }),
  }),
  getTableDetail: build.query<unknown, { configuration: ConnectionConfiguration; table: string }>({
    query: (payload) => ({
      uri: URI.database?.[payload.configuration.client],
      method: 'getTableInfo',
      args: [payload.configuration.metadata, payload.table],
    }),
  }),
})

export default database
