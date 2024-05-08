import React, { useMemo } from 'react'
import { Flex, Button, Alert } from 'antd'
import RouteDrawer from '../../route-drawer'
import SqlEditor from '../../sql-editor'
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

  const { code, isError, errorMsg } = useMemo(() => {
    const item = sqlRunCodes?.[databaseId] || {}
    return {
      code: item?.value || '',
      isError: item?.isError,
      errorMsg: item?.errorMsg,
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
    dispatch(
      setSqlRunCode({
        id: databaseId,
        target: { isError: !!errorMsg, errorMsg: errorMsg ? errorMsg : '' },
      }),
    )
  }

  return (
    <RouteDrawer
      extra={
        <Button type="primary" disabled={!code.trim()} loading={isLoading} ghost onClick={handleOnClickRunCode}>
          {t('sql.run')}
        </Button>
      }
      width={wh[0]}
      classNames={{ header: styles.dbDrawerHeader, body: styles.dbDrawerBody }}
    >
      <Flex className={styles.dbDrawerEditor} vertical align="flex-start" justify="flex-start">
        <SqlEditor defaultValue={code} onChange={handleOnCodeChanged} style={{ width: '100%', height: '100%' }} />
      </Flex>
      {isError && (
        <Flex className={styles.dbDrawerError} vertical align="flex-start" justify="flex-start">
          <Alert message={errorMsg} type="error" showIcon />
        </Flex>
      )}
    </RouteDrawer>
  )
}

export default DatabaseItemSqlQuery
