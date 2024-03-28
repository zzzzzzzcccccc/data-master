import React from 'react'
import { Flex, Button, Tooltip } from 'antd'
import Icon from '../../icon'
import styles from '../global-layout.module.scss'
import { useTheme, useTranslation, useAppDispatch } from '../../../hooks'
import { setSettingsVisible } from '../../../store'

function GlobalHeader() {
  const { colorPrimary, size } = useTheme()
  const dispatch = useAppDispatch()
  const t = useTranslation()

  const onClickSettings = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    dispatch(setSettingsVisible(true))
  }

  return (
    <Flex
      className={styles.header}
      justify="flex-start"
      align="center"
      style={{ backgroundColor: colorPrimary }}
      gap={size}
    >
      <div className={styles.headerDrag} />
      <Flex className={styles.headerTool} justify="flex-end" align="center" gap={size}>
        <Tooltip title={t('settings')} placement="left">
          <Button type="primary" onClick={onClickSettings} icon={<Icon target="icon-setting" />} />
        </Tooltip>
      </Flex>
    </Flex>
  )
}

export default GlobalHeader
