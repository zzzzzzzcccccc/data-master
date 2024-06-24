import React from 'react'
import { Flex } from 'antd'
import { DbForeignProps } from './types'
import Icon from '../icon'
import styles from './foreigner.module.scss'
import { useTheme, useTranslation } from '../../hooks'

function DbForeign(props: DbForeignProps) {
  const { item } = props
  const { theme } = useTheme()
  const t = useTranslation()

  const items = [
    { className: styles.foreignColumnName, value: item.columnName },
    {
      className: styles.foreignOther,
      value: t('foreigner_table_column', { table: item.referencedTableName, column: item.referencedColumnName }),
    },
  ]
  const title = items.map((i) => i.value).join(' ')

  return (
    <Flex vertical title={title}>
      <Flex className={styles.foreign} align="center" justify="flex-start" gap={theme.size}>
        <Icon target="icon-waijian" />
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

export default DbForeign
