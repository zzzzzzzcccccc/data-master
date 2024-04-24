import { useMemo } from 'react'
import useGetDatabaseId from './use-get-database-id'
import { ConnectionConfiguration } from '@dm/core'
import { gatewayApi } from '../store'

const { useGetConnectionConfigurationsQuery } = gatewayApi

function useGetDatabaseConfiguration() {
  const databaseId = useGetDatabaseId()
  const { data = [], isError, isLoading } = useGetConnectionConfigurationsQuery()

  const configuration: ConnectionConfiguration = useMemo(() => {
    if (!databaseId) {
      return {} as ConnectionConfiguration
    }
    return data.find((config) => config.id === databaseId) || ({} as ConnectionConfiguration)
  }, [data, databaseId])

  return {
    databaseId,
    configuration,
    configurations: data,
    hasConfiguration: !!configuration.id,
    isError,
    isLoading,
  }
}

export default useGetDatabaseConfiguration
