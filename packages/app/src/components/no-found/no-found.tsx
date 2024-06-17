import React from 'react'
import { Flex } from 'antd'
import { SmileOutlined } from '@ant-design/icons'
import { useTranslation } from '../../hooks'

export default function NoFound() {
  const t = useTranslation()

  return (
    <Flex vertical justify="center" align="center" style={{ padding: 'var(--dm-spacing-4)' }}>
      <SmileOutlined style={{ fontSize: 'var(--dm-large-font-size)' }} />
      <span style={{ paddingTop: 'var(--dm-spacing-4)', fontSize: 'var(--dm-small-font-size)' }}>{t('no_found')}</span>
    </Flex>
  )
}
