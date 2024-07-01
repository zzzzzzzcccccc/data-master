import React, { useMemo } from 'react'
import { Flex, Button } from 'antd'
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

  const { code } = useMemo(() => {
    const item = sqlRunCodes?.[databaseId] || {}
    return {
      code: item?.value || '',
      isError: item?.isError,
      errorMsg: item?.errorMsg,
      data: item?.data,
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
      extra={
        <Button type="primary" disabled={!code.trim()} loading={isLoading} ghost onClick={handleOnClickRunCode}>
          {t('sql.run')}
        </Button>
      }
      width={wh[0]}
      classNames={{ header: styles.dbDrawerHeader, body: styles.dbDrawerBody }}
    >
      <Flex className={styles.dbDrawerEditor} vertical align="flex-start" justify="flex-start">
        <SqlEditor className="w100 h100" defaultValue={code} onChange={handleOnCodeChanged} />
      </Flex>
      <Flex className={styles.dbDrawerWrapper} vertical align="flex-start" justify="flex-start">
        hello
      </Flex>
    </RouteDrawer>
  )
}

export default DatabaseItemSqlQuery
