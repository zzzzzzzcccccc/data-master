import React, { useEffect } from 'react'
import { Form, Button, Flex, Spin, Popconfirm } from 'antd'
import { CLIENT_NAMES, ConnectionConfiguration } from '@dm/core'
import { ConnectionFormProps } from './types'
import ConnectionMysql from './connection-mysql'
import {
  useAppSelector,
  useAppDispatch,
  useTranslation,
  useTestConnectionMutation,
  useInsertConnectionConfigurationMutation,
} from '../../hooks'
import {
  setAddConnectionConfigurationForClient,
  setAddConnectionConfigurationErrorForClient,
  resetAddConnectionConfiguration,
} from '../../store'
import { logger as baseLogger } from '../../utils'
import Icon from '../icon'

const logger = baseLogger.getSubLogger('ConnectionForm')

const formLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}
const formMapper: Record<string, React.ReactNode> = {
  [CLIENT_NAMES.mysql.key]: <ConnectionMysql />,
}

function ConnectionForm(props: ConnectionFormProps) {
  const { client } = props
  const t = useTranslation()
  const { addConnectionConfigurations, resetAddConnectionConfigurationsAt, addConnectionConfigurationsError } =
    useAppSelector((state) => state.app)
  const [testConnection, { isLoading: isLoadingTestConnection }] = useTestConnectionMutation()
  const [insertConnectionConfiguration, { isLoading: isLoadingInsertConnectionConfiguration }] =
    useInsertConnectionConfigurationMutation()
  const dispatch = useAppDispatch()
  const [form] = Form.useForm()

  const connectionError = !!addConnectionConfigurationsError?.[client]
  const loading = isLoadingTestConnection || isLoadingInsertConnectionConfiguration
  const initialValues = addConnectionConfigurations[client]

  const handlerOnValuesChange = (changedValues: Partial<Omit<ConnectionConfiguration, 'id' | 'client'>>) => {
    logger.debug(`changed to: ${JSON.stringify(changedValues)}`)

    dispatch(setAddConnectionConfigurationForClient({ client, payload: changedValues }))
  }

  const handleOnSaveConnection = async () => {
    const values = form.getFieldsValue() as Omit<ConnectionConfiguration, 'id'>
    const result = await insertConnectionConfiguration({ client, configuration: values })
    if (result?.data) {
      dispatch(resetAddConnectionConfiguration({ client }))
    }
  }

  const handlerOnCancel = () => {
    dispatch(
      setAddConnectionConfigurationErrorForClient({
        client,
        target: false,
      }),
    )
  }

  const handlerOnFinish = async (values: Omit<ConnectionConfiguration, 'id'>) => {
    logger.debug(`submit to: ${JSON.stringify(values)}`)

    if (!loading) {
      const resultTestConnection = await testConnection({ client, configuration: values })
      if (resultTestConnection?.data) {
        handleOnSaveConnection()
      } else {
        dispatch(
          setAddConnectionConfigurationErrorForClient({
            client,
            target: true,
          }),
        )
      }
    }
  }

  useEffect(() => {
    if (resetAddConnectionConfigurationsAt?.[client]) {
      form.resetFields()
    }
  }, [form, client, resetAddConnectionConfigurationsAt])

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
          <Popconfirm
            title={t('connection.failed.title')}
            description={t('connection.failed.message')}
            open={connectionError}
            okButtonProps={{ loading }}
            onConfirm={handleOnSaveConnection}
            onCancel={handlerOnCancel}
          >
            <Button
              icon={<Icon target="icon-save" />}
              disabled={loading}
              style={{ width: '100%' }}
              type="primary"
              htmlType="submit"
            >
              {t('connection.save')}
            </Button>
          </Popconfirm>
        </Flex>
      </Spin>
    </Form>
  )
}

export default ConnectionForm
