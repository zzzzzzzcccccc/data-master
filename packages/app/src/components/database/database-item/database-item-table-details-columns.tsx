import React, { useMemo } from 'react'
import { Collapse, Flex } from 'antd'
import { useGetDatabaseTableDetails, useTranslation } from '../../../hooks'
import Columns from '../../columns'
import styles from './database-item.module.scss'

function DatabaseItemTableDetailsColumns() {
  const t = useTranslation()
  const { tableDetail } = useGetDatabaseTableDetails()

  const items = useMemo(() => {
    return [
      {
        key: 'columns',
        label: t('columns'),
        children: tableDetail ? <Columns mode="db" data={tableDetail.columns} /> : '',
      },
    ]
  }, [t, tableDetail])

  return (
    <Flex vertical className={styles.dbColumns}>
      <Collapse items={items} defaultActiveKey="columns" />
    </Flex>
  )
}

export default DatabaseItemTableDetailsColumns
