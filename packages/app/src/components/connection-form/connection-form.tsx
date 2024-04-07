import React from 'react'
import { Form, Button, Flex, Spin, Alert } from 'antd'
import { CLIENT_NAMES, ConnectionConfiguration, ASYNC_STATUS } from '@dm/core'
import { ConnectionFormProps } from './types'
import ConnectionMysql from './connection-mysql'
import { useAppSelector, useAppDispatch, useTranslation } from '../../hooks'
import {
  setAddConnectionConfigurationForClient,
  fetchTestConnection,
  fetchAddConnectionConfiguration,
} from '../../store'
import { logger as baseLogger } from '../../utils'
import Icon from '../icon'

const logger = baseLogger.getSubLogger('ConnectionForm')

const formLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

function ConnectionForm(props: ConnectionFormProps) {
  const { client } = props
  const t = useTranslation()
  const {
    addConnectionConfigurations,
    addConnectionConfigurationsConnectionError,
    addConnectionConfigurationsLoading,
  } = useAppSelector((state) => state.app)
  const dispatch = useAppDispatch()
  const [form] = Form.useForm()

  const connectionError = addConnectionConfigurationsConnectionError[client]
  const loading = addConnectionConfigurationsLoading[client]
  const initialValues = addConnectionConfigurations[client]

  const formMapper: Record<string, React.ReactNode> = {
    [CLIENT_NAMES.mysql.key]: <ConnectionMysql />,
  }

  const handlerOnValuesChange = (changedValues: Partial<Omit<ConnectionConfiguration, 'id' | 'client'>>) => {
    logger.debug(`changed to: ${JSON.stringify(changedValues)}`)

    dispatch(setAddConnectionConfigurationForClient({ client, payload: changedValues }))
  }

  const handlerOnFinish = async (values: Omit<ConnectionConfiguration, 'id'>) => {
    logger.debug(`submit to: ${JSON.stringify(values)}`)

    if (!loading) {
      const resultFetchTestConnectionAction = await dispatch(fetchTestConnection({ client, configuration: values }))

      if (resultFetchTestConnectionAction.meta.requestStatus === ASYNC_STATUS.fulfilled) {
        const resultFetchAddConnectionConfigurationAction = await dispatch(
          fetchAddConnectionConfiguration({ client, configuration: values }),
        )
        if (resultFetchAddConnectionConfigurationAction.meta.requestStatus === ASYNC_STATUS.fulfilled) {
          form.resetFields()
        }
      }
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
        {connectionError && (
          <Alert
            message={t('connection.failed.title')}
            description={t('connection.failed.message')}
            type="warning"
            showIcon
          />
        )}
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
