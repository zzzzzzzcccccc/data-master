import React from 'react'
import { Flex, Tabs, Button } from 'antd'
import Icon from '../../icon'
import { useAppSelector, useTheme } from '../../../hooks'
import styles from './database-item.module.scss'
import { history } from '../../../utils'

function DatabaseItemHeader() {
  const { size } = useTheme()
  const { historyUpdate } = useAppSelector((state) => state.app)

  const handleOnClickSqlQuery = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    history.push(`${historyUpdate.location.pathname}/sql-query`)
  }

  const headerRight = (
    <Flex className={styles.dbHeaderRight} gap={size}>
      <Button type="primary" onClick={handleOnClickSqlQuery} ghost icon={<Icon target="icon-sql-query" />} />
      <Button type="primary" ghost icon={<Icon target="icon-table-info" />} />
    </Flex>
  )
  return (
    <Flex vertical className={styles.dbHeader}>
      <Tabs className="w100" tabBarExtraContent={{ right: headerRight }} />
    </Flex>
  )
}

export default DatabaseItemHeader
