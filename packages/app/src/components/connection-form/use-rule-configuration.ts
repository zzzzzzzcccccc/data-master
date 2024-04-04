import { FormItemProps } from 'antd'
import { useTranslation } from '../../hooks'
import { validatorNumber } from '../../utils'

export default function useRuleConfiguration() {
  const t = useTranslation()
  const requiredMessage = (i18nFieldKey: string) => t('form.input.required', { label: t(i18nFieldKey) })
  const requiredNumberMessage = (i18nFieldKey: string) => t('form.input.number', { label: t(i18nFieldKey) })

  const mysqlRules: Record<string, FormItemProps['rules']> = {
    name: [{ required: true, message: requiredMessage('add.connection.name'), whitespace: true }],
    host: [{ required: true, message: requiredMessage('add.connection.host'), whitespace: true }],
    database: [{ required: true, message: requiredMessage('add.connection.database'), whitespace: true }],
    user: [{ required: true, message: requiredMessage('add.connection.user'), whitespace: true }],
    password: [{ required: true, message: requiredMessage('add.connection.password'), whitespace: true }],
    port: [{ validator: validatorNumber, message: requiredNumberMessage('add.connection.port') }],
  }

  return {
    mysqlRules,
  }
}
