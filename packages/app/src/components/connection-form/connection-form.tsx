import React from 'react'
import { Form, Button, Flex, Spin } from 'antd'
import { CLIENT_NAMES, ConnectionConfiguration } from '@dm/core'
import { ConnectionFormProps } from './types'
import ConnectionMysql from './connection-mysql'
import { useAppSelector, useAppDispatch } from '../../hooks'
import { setAddConnectionConfigurationForClient, fetchAddConnectionConfiguration } from '../../store'
import { logger as baseLogger } from '../../utils'
import Icon from '../icon'

const logger = baseLogger.getSubLogger('ConnectionForm')

const formLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

function ConnectionForm(props: ConnectionFormProps) {
  const { client } = props
  const { addConnectionConfigurations, addConnectionConfigurationsLoading } = useAppSelector((state) => state.app)
  const dispatch = useAppDispatch()
  const [form] = Form.useForm()

  const loading = addConnectionConfigurationsLoading[client]
  const initialValues = addConnectionConfigurations[client]

  const formMapper: Record<string, React.ReactNode> = {
    [CLIENT_NAMES.mysql.key]: <ConnectionMysql />,
  }

  const handlerOnValuesChange = (changedValues: Partial<Omit<ConnectionConfiguration, 'id' | 'client'>>) => {
    logger.debug(`changed to: ${JSON.stringify(changedValues)}`)

    dispatch(setAddConnectionConfigurationForClient({ client, payload: changedValues }))
  }

  const handlerOnFinish = (values: Omit<ConnectionConfiguration, 'id'>) => {
    logger.debug(`submit to: ${JSON.stringify(values)}`)

    if (!loading) {
      dispatch(fetchAddConnectionConfiguration({ client, configuration: values })).then(() => {
        form.resetFields()
      })
    }
  }

  return (
    <Form
      {...formLayout}
      initialValues={initialValues}
      name={`connection-${client}`}
      onValuesChange={handlerOnValuesChange}
      onFinish={handlerOnFinish}
      form={form}
      style={{ width: '100%' }}
    >
      <Spin spinning={loading}>
        {formMapper[client]}
        <Flex style={{ width: '100%' }} vertical align="flex-start" justify="flex-start">
          <Button
            icon={<Icon target="icon-save" />}
            disabled={loading}
            style={{ width: '100%' }}
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
        </Flex>
      </Spin>
    </Form>
  )
}

export default ConnectionForm
