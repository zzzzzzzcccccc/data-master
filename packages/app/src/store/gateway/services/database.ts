import { type EndpointBuilder } from '@reduxjs/toolkit/query/react'
import { ConnectionConfiguration, URI, Table, TableDetails } from '@dm/core'
import { type BaseRPCQuery } from '../gateway'
import { type TableQueryPayload } from '../../slices/container-slice'

const database = (build: EndpointBuilder<BaseRPCQuery, string, string>) => ({
  runSql: build.mutation<unknown, { configuration: ConnectionConfiguration; code: string }>({
    query: (payload) => ({
      uri: URI.database?.[payload.configuration.client],
      method: 'runSql',
      args: [payload.configuration.metadata, payload.code],
    }),
  }),
  getTables: build.query<Table[] | null, ConnectionConfiguration>({
    query: (payload) => ({
      uri: URI.database?.[payload.client],
      method: 'getTables',
      args: [payload.metadata],
    }),
  }),
  getTableDetail: build.query<TableDetails | null, { configuration: ConnectionConfiguration; table: string }>({
    query: (payload) => ({
      uri: URI.database?.[payload.configuration.client],
      method: 'getTableInfo',
      args: [payload.configuration.metadata, payload.table],
    }),
  }),
  getTableData: build.query<
    { data: Array<Record<string, unknown>>; total: string } | null,
    { configuration: ConnectionConfiguration; query: { tableName: string } & TableQueryPayload }
  >({
    query: (payload) => {
      return {
        uri: URI.database?.[payload.configuration.client],
        method: 'queryList',
        args: [
          payload.configuration.metadata,
          {
            tableName: payload.query.tableName,
            limit: [(payload.query.pageIndex - 1) * payload.query.pageSize, payload.query.pageSize],
          },
        ],
      }
    },
  }),
})

export default database
