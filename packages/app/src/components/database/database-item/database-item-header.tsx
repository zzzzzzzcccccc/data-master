import React, { useMemo } from 'react'
import { Flex, Tabs, Button } from 'antd'
import Icon from '../../icon'
import { useGetDatabaseTables, useTheme, useHistory } from '../../../hooks'
import styles from './database-item.module.scss'

function DatabaseItemHeader() {
  const {
    theme: { size },
  } = useTheme()
  const { linkToTable, linkToSqlQuery } = useHistory()
  const { tables, tableName } = useGetDatabaseTables()

  const tabs = useMemo(() => {
    return tables.map((item) => ({
      key: item.tableName,
      label: item.tableName,
    }))
  }, [tables])

  const headerRight = (
    <Flex className={styles.dbHeaderRight} gap={size}>
      <Button type="primary" onClick={linkToSqlQuery} ghost icon={<Icon target="icon-sql-query" />} />
    </Flex>
  )
  return (
    <Flex vertical className={styles.dbHeader}>
      <Tabs
        activeKey={tableName}
        type="card"
        items={tabs}
        className="w100"
        tabBarExtraContent={{ right: headerRight }}
        onChange={linkToTable}
      />
    </Flex>
  )
}

export default DatabaseItemHeader
