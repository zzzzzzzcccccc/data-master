import React from 'react'
import { Modal, Tabs } from 'antd'
import { useAppSelector, useAppDispatch, useTranslation } from '../../hooks'
import { setSettingsVisible } from '../../store'
import Theme from './theme'
import styles from './settings.module.scss'

function Settings() {
  const { settingsVisible } = useAppSelector((state) => state.app)
  const dispatch = useAppDispatch()
  const t = useTranslation()

  const close = () => dispatch(setSettingsVisible(false))

  const items = [{ key: '1', label: t('theme'), children: <Theme /> }]

  return (
    <Modal open={settingsVisible} onCancel={close} footer={null}>
      <div className={styles.settings}>
        <Tabs items={items} />
      </div>
    </Modal>
  )
}

export default Settings
