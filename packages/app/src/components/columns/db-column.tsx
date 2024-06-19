import React from 'react'
import { type DbColumnProps } from './types'
import { Flex } from 'antd'
import styles from './columns.module.scss'
import Icon from '../icon'
import { useTheme, useTranslation } from '../../hooks'

function DbColumn(props: DbColumnProps) {
  const { item } = props
  const { theme } = useTheme()
  const t = useTranslation()

  const items = [
    { className: styles.dbColumnName, value: item.columnName },
    {
      className: styles.dbColumnType,
      value: item.columnType + (item.columnDefaultValue ? ` = ${item.columnDefaultValue}` : ''),
    },
    { className: styles.dbColumnOther, value: item.columnExtra ? `(${item.columnExtra})` : '' },
    { className: styles.dbColumnOther, value: item.columnNotNull ? t('notNull') : t('null') },
    {
      className: styles.dbColumnOther,
      value: item.columnComment ? t('comment_with_content', { content: item.columnComment }) : '',
    },
  ]
  const title = items
    .map((i) => i.value)
    .filter(Boolean)
    .join(' ')

  return (
    <Flex vertical className={styles.dbItem} title={title}>
      <Flex className={styles.dbColumn} align="center" justify="flex-start" gap={theme.size}>
        <Icon target="icon-db_field" style={{ color: item.columnIsPrimaryKey ? theme.primaryColor : 'inherit' }} />
        {items.map((record, index) => (
          <React.Fragment key={index}>
            {record.value && (
              <span key={index} className={record.className}>
                {record.value}
              </span>
            )}
          </React.Fragment>
        ))}
      </Flex>
    </Flex>
  )
}

export default DbColumn
