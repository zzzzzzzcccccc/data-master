import React, { useMemo } from 'react'
import { Flex, Alert } from 'antd'
import ScrollTable from '../../scroll-table'
import {
  useAppSelector,
  useGetDatabaseConfiguration,
  useAntdTableScroll,
  AntdTableScrollScene,
  useTranslation,
} from '../../../hooks'

function DatabaseItemSqlQueryResult() {
  const { databaseId } = useGetDatabaseConfiguration()
  const { wrapperRef, scroll } = useAntdTableScroll({ scene: AntdTableScrollScene.databaseQuery })
  const { sqlRunCodes } = useAppSelector((state) => state.container)
  const t = useTranslation()

  const { isError, isQuery, errorMsg, columns, dataSource, insertId, affectedRows } = useMemo(() => {
    const item = sqlRunCodes?.[databaseId] || {}
    const rows = item?.data?.rows || []
    const fields = item?.data?.fields || []
    return {
      isError: item?.isError,
      isQuery: rows.length > 0 || fields.length > 0,
      errorMsg: item?.errorMsg,
      dataSource: rows,
      insertId: item?.data?.insertId,
      affectedRows: item?.data?.affectedRows,
      columns: fields.map((item) => ({
        dataIndex: item,
        title: item,
        width: 150,
        ellipsis: true,
      })),
    }
  }, [databaseId, sqlRunCodes])

  if (isError) {
    return (
      <Flex className="w100" vertical justify="center" align="center">
        <Alert message={errorMsg} type="error" />
      </Flex>
    )
  }

  if (isQuery) {
    return (
      <ScrollTable
        hiddenTopBorder={false}
        scroll={scroll}
        columns={columns}
        dataSource={dataSource}
        wrapperRef={wrapperRef}
      />
    )
  }

  return (
    <Flex className="w100" vertical justify="center" align="center">
      <Alert message={t('sql_query_result', { insertId, affectedRows })} type="success" />
    </Flex>
  )
}

export default DatabaseItemSqlQueryResult
