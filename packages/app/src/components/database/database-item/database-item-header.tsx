import React, { useMemo } from 'react'
import { Flex, Tabs, Button } from 'antd'
import Icon from '../../icon'
import { useGetDatabaseTables, useGetDatabaseTableName, useTheme, useHistory } from '../../../hooks'
import styles from './database-item.module.scss'

function DatabaseItemHeader() {
  const {
    theme: { size },
  } = useTheme()
  const { linkToTable, linkToSqlQuery } = useHistory()
  const activeTable = useGetDatabaseTableName()
  const { tables } = useGetDatabaseTables()

  const tabs = useMemo(() => {
    return tables.map((item) => ({
      key: item,
      label: item,
    }))
  }, [tables])

  const headerRight = (
    <Flex className={styles.dbHeaderRight} gap={size}>
      <Button type="primary" onClick={linkToSqlQuery} ghost icon={<Icon target="icon-sql-query" />} />
      <Button type="primary" ghost icon={<Icon target="icon-table-info" />} />
    </Flex>
  )
  return (
    <Flex vertical className={styles.dbHeader}>
      <Tabs
        activeKey={activeTable}
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
