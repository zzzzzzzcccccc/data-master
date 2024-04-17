import React from 'react'
import { Flex, Tabs, Button } from 'antd'
import Icon from '../../icon'
import styles from './database-item.module.scss'
import { useDatabaseItemHeaderEffect } from '../../../effects'

function DatabaseItemHeader() {
  const { size, tabs, tabActive, handleOnClickSqlQuery, handleOnTabChange } = useDatabaseItemHeaderEffect()

  const headerRight = (
    <Flex className={styles.dbHeaderRight} gap={size}>
      <Button type="primary" onClick={handleOnClickSqlQuery} ghost icon={<Icon target="icon-sql-query" />} />
      <Button type="primary" ghost icon={<Icon target="icon-table-info" />} />
    </Flex>
  )
  return (
    <Flex vertical className={styles.dbHeader}>
      <Tabs
        activeKey={tabActive}
        type="card"
        items={tabs}
        className="w100"
        tabBarExtraContent={{ right: headerRight }}
        onChange={handleOnTabChange}
      />
    </Flex>
  )
}

export default DatabaseItemHeader
