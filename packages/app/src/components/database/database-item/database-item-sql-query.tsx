import React from 'react'
import { Flex, Button, Alert } from 'antd'
import RouteDrawer from '../../route-drawer'
import { useDatabaseItemSqlQueryEffect } from '../../../effects'
import SqlEditor from '../../sql-editor'
import styles from './database-item.module.scss'
import { useTranslation } from '../../../hooks'

function DatabaseItemSqlQuery() {
  const {
    wh,
    code,
    codeRunning,
    codeRunningError,
    codeRunningResultErrorMsg,
    handleOnCodeChanged,
    handleOnClickRunCode,
  } = useDatabaseItemSqlQueryEffect()
  const t = useTranslation()

  return (
    <RouteDrawer
      extra={
        <Button type="primary" disabled={!code.trim()} loading={codeRunning} ghost onClick={handleOnClickRunCode}>
          {t('sql.run')}
        </Button>
      }
      width={wh[0]}
      classNames={{ header: styles.dbDrawerHeader, body: styles.dbDrawerBody }}
    >
      <Flex className={styles.dbDrawerEditor} vertical align="flex-start" justify="flex-start">
        <SqlEditor defaultValue={code} onChange={handleOnCodeChanged} style={{ width: '100%', height: '100%' }} />
      </Flex>
      {codeRunningError && (
        <Flex className={styles.dbDrawerError} vertical align="flex-start" justify="flex-start">
          <Alert message={codeRunningResultErrorMsg} type="error" showIcon />
        </Flex>
      )}
    </RouteDrawer>
  )
}

export default DatabaseItemSqlQuery
