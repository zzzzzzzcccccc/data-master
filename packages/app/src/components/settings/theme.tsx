import React from 'react'
import { Form, Select, Radio, ColorPicker } from 'antd'
import { type Color } from 'antd/es/color-picker'
import { useTranslation, useAppSelector, useAppDispatch } from '../../hooks'
import { i18nConfig } from '../../config'
import { logger as baseLogger } from '../../utils'
import { THEME_MODE, SIZE } from '@db-gui/core'
import { setTheme } from '../../store'
import styles from './settings.module.scss'

const logger = baseLogger.getSubLogger('SettingsTheme')

function Theme() {
  const { theme } = useAppSelector((state) => state.app)
  const dispatch = useAppDispatch()
  const t = useTranslation()
  const i18nResources = i18nConfig.configuration.resources || {}
  const langOptions = Object.keys(i18nResources).map((lang) => ({
    value: lang,
    label: (i18nResources[lang]?.displayLang || '') as string,
  }))

  const handleOnValuesChange = (current: Record<string, string | Color>) => {
    logger.debug(`changed to: ${JSON.stringify(current)}`)

    if (current.primaryColor) {
      current.primaryColor = (current.primaryColor as Color).toHexString()
    }

    dispatch(setTheme(current))
  }

  return (
    <Form
      className={styles.settingsInfo}
      initialValues={theme}
      name="settings-theme"
      layout="vertical"
      onValuesChange={handleOnValuesChange}
    >
      <Form.Item name="mode" label={t('mode')}>
        <Radio.Group>
          <Radio.Button value={THEME_MODE.light}>{t('light')}</Radio.Button>
          <Radio.Button value={THEME_MODE.dark}>{t('dark')}</Radio.Button>
          <Radio.Button value={THEME_MODE.system}>{t('auto')}</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item name="size" label={t('theme.size')}>
        <Radio.Group>
          <Radio.Button value={SIZE.small}>{t('small')}</Radio.Button>
          <Radio.Button value={SIZE.middle}>{t('middle')}</Radio.Button>
          <Radio.Button value={SIZE.large}>{t('large')}</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item name="primaryColor" label={t('theme.primary.color')}>
        <ColorPicker showText />
      </Form.Item>
      <Form.Item name="lang" label={t('language')}>
        <Select showSearch optionFilterProp="label" filterOption options={langOptions} />
      </Form.Item>
    </Form>
  )
}

export default Theme
