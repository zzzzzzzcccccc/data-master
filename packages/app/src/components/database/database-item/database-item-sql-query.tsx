import React from 'react'
import { Flex, Button } from 'antd'
import RouteDrawer from '../../route-drawer'
import { useDatabaseItemSqlQueryEffect } from '../../../effects'
import SqlEditor from '../../sql-editor'
import styles from './database-item.module.scss'
import { useTranslation } from '../../../hooks'

function DatabaseItemSqlQuery() {
  const { wh, code, handleOnCodeChanged } = useDatabaseItemSqlQueryEffect()
  const t = useTranslation()

  return (
    <RouteDrawer
      extra={
        <Button type="primary" ghost>
          {t('sql.run')}
        </Button>
      }
      width={wh[0]}
      classNames={{ header: styles.dbDrawerHeader, body: styles.dbDrawerBody }}
    >
      <Flex vertical align="flex-start" justify="flex-start">
        <SqlEditor defaultValue={code} onChange={handleOnCodeChanged} style={{ width: '100%', height: 300 }} />
      </Flex>
    </RouteDrawer>
  )
}

export default DatabaseItemSqlQuery
