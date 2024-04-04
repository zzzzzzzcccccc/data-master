import React from 'react'
import { Form, Input, InputNumber } from 'antd'
import { useTranslation } from '../../hooks'
import useRuleConfiguration from './use-rule-configuration'

function ConnectionMysql() {
  const t = useTranslation()
  const { mysqlRules } = useRuleConfiguration()

  return (
    <>
      <Form.Item label={t('add.connection.name')} name="name" rules={mysqlRules.name}>
        <Input />
      </Form.Item>
      <Form.Item label={t('add.connection.host')} name={['metadata', 'host']} rules={mysqlRules.host}>
        <Input />
      </Form.Item>
      <Form.Item label={t('add.connection.database')} name={['metadata', 'database']} rules={mysqlRules.database}>
        <Input />
      </Form.Item>
      <Form.Item label={t('add.connection.user')} name={['metadata', 'user']} rules={mysqlRules.user}>
        <Input />
      </Form.Item>
      <Form.Item label={t('add.connection.password')} name={['metadata', 'password']} rules={mysqlRules.password}>
        <Input type="password" />
      </Form.Item>
      <Form.Item label={t('add.connection.port')} name={['metadata', 'port']} rules={mysqlRules.port}>
        <InputNumber style={{ width: '100%' }} min={0} max={65535} />
      </Form.Item>
    </>
  )
}

export default ConnectionMysql
