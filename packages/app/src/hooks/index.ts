import { useAppSelector, useAppDispatch } from './use-store'
import { gatewayApi } from '../store'
import useMediaQuery from './use-media-query'
import useMount from './use-mount'
import useTheme from './use-theme'
import useTranslation from './use-translate'
import useGetDatabaseId from './use-get-database-id'
import useGetDatabaseConfiguration from './use-get-database-configuration'
import useGetDatabaseTables from './use-get-database-tables'
import useGetDatabaseTableName from './use-get-database-table-name'
import useGetDatabaseTable from './use-get-database-table'
import useHistory from './use-history'

export {
  useAppSelector,
  useAppDispatch,
  useMediaQuery,
  useMount,
  useTheme,
  useTranslation,
  useGetDatabaseId,
  useGetDatabaseConfiguration,
  useGetDatabaseTables,
  useGetDatabaseTableName,
  useGetDatabaseTable,
  useHistory,
}
export const {
  useGetConnectionConfigurationsQuery,
  useTestConnectionMutation,
  useInsertConnectionConfigurationMutation,
  useGetTablesQuery,
  useRunSqlMutation,
  useGetTableDetailQuery,
} = gatewayApi
