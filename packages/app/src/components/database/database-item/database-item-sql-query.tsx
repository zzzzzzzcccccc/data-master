import React, { useMemo } from 'react'
import { Flex, Button } from 'antd'
import RouteDrawer from '../../route-drawer'
import SqlEditor from '../../sql-editor'
import DatabaseItemSqlQueryResult from './database-item-sql-query-result'
import styles from './database-item.module.scss'
import {
  useTranslation,
  useRunSqlMutation,
  useAppSelector,
  useAppDispatch,
  useGetDatabaseConfiguration,
} from '../../../hooks'
import { setSqlRunCode } from '../../../store'

function DatabaseItemSqlQuery() {
  const t = useTranslation()
  const { databaseId, configuration } = useGetDatabaseConfiguration()
  const { wh, sqlRunCodes } = useAppSelector((state) => state.container)
  const dispatch = useAppDispatch()
  const [runSql, { isLoading }] = useRunSqlMutation()

  const { code, isError, showResult, duration, total } = useMemo(() => {
    const item = sqlRunCodes?.[databaseId] || {}
    return {
      isError: item?.isError,
      duration: item?.data?.duration,
      total: (item?.data?.rows || []).length,
      code: item?.value || '',
      showResult: Object.keys(item?.data || {}).length > 0 || item?.isError,
    }
  }, [databaseId, sqlRunCodes])

  const handleOnCodeChanged = (value: string) => {
    dispatch(
      setSqlRunCode({
        id: databaseId,
        target: { value },
      }),
    )
  }

  const handleOnClickRunCode = async () => {
    if (isLoading) return
    const result = await runSql({ configuration, code })
    // @ts-ignore
    const errorMsg = result?.error
    // @ts-ignore
    const data = result?.data
    dispatch(
      setSqlRunCode({
        id: databaseId,
        target: { isError: !!errorMsg, errorMsg: errorMsg ? errorMsg : '', data },
      }),
    )
  }

  return (
    <RouteDrawer
      title={t('sql_query_title')}
      extra={
        <Flex align="center" className={styles.dbDrawerHeaderRight}>
          {total > 0 && <span>{t('sql_query_total', { total })}</span>}
          {showResult && !isError && <span>{t('sql_query_duration', { duration })}</span>}
          <Button type="primary" disabled={!code.trim()} loading={isLoading} ghost onClick={handleOnClickRunCode}>
            {t('sql.run')}
          </Button>
        </Flex>
      }
      width={wh[0]}
      classNames={{ header: styles.dbDrawerHeader, body: styles.dbDrawerBody }}
    >
      <Flex className={styles.dbDrawerEditor} vertical align="center" justify="center">
        <SqlEditor className="w100 h100" defaultValue={code} onChange={handleOnCodeChanged} />
      </Flex>
      {showResult && (
        <Flex className={styles.dbDrawerWrapper} vertical align="flex-start" justify="flex-start">
          <DatabaseItemSqlQueryResult />
        </Flex>
      )}
    </RouteDrawer>
  )
}

export default DatabaseItemSqlQuery
