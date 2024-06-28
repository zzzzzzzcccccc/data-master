import React, { useMemo } from 'react'
import { Collapse, Flex } from 'antd'
import { useGetDatabaseTableDetails, useTranslation } from '../../../hooks'
import Columns from '../../columns'
import Indexes from '../../indexes'
import Foreigner from '../../foreigner'
import Checks from '../../checks'
import styles from './database-item.module.scss'

function DatabaseItemTableDetailsColumns() {
  const t = useTranslation()
  const { tableDetail } = useGetDatabaseTableDetails()

  const items = useMemo(() => {
    return [
      {
        key: 'columns',
        label: `${t('columns')} (${tableDetail?.columns.length})`,
        children: tableDetail ? <Columns mode="db" data={tableDetail.columns} /> : '',
      },
      {
        key: 'indexes',
        label: `${t('indexes')} (${tableDetail?.indexes.length})`,
        children: tableDetail ? <Indexes mode="db" data={tableDetail.indexes} /> : '',
      },
      {
        key: 'foreigner',
        label: `${t('foreigner')} (${tableDetail?.foreign.length})`,
        children: tableDetail ? <Foreigner mode="db" data={tableDetail.foreign} /> : '',
      },
      {
        key: 'checks',
        label: `${t('checks')} (${tableDetail?.checks.length})`,
        children: tableDetail ? <Checks mode="db" data={tableDetail.checks} /> : '',
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
