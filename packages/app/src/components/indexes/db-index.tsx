import React from 'react'
import { Flex } from 'antd'
import { DbIndexProps } from './types'
import { useTheme, useTranslation } from '../../hooks'
import Icon from '../icon'
import styles from './indexes.module.scss'

function DbIndex(props: DbIndexProps) {
  const { item } = props
  const { theme } = useTheme()
  const t = useTranslation()

  const items = [
    { className: styles.indexColumnName, value: item.columnName },
    { className: styles.indexOther, value: item.indexType },
    { className: styles.indexOther, value: item.unique ? t('unique') : '' },
    {
      className: styles.indexOther,
      value: item.indexComment ? t('comment_with_content', { content: item.indexComment }) : '',
    },
  ]
  const title = items.map((i) => i.value).join(' ')

  return (
    <Flex vertical title={title}>
      <Flex className={styles.indexItem} align="center" justify="flex-start" gap={theme.size}>
        <Icon target="icon-index" style={{ color: item.indexName === 'PRIMARY' ? theme.primaryColor : 'inherit' }} />
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

export default DbIndex
