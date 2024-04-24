import React from 'react'
import { Flex } from 'antd'
import styles from '../global-layout.module.scss'
import { useAppDispatch, useTheme, useTranslation } from '../../../hooks'
import { setSettingsVisible } from '../../../store'
import SliderMenu from './slider-menu'
import SelectConnection from '../../select-connection'
import Connections from '../../connections'

function GlobalSlider() {
  const {
    theme: { size, primaryColor },
  } = useTheme()

  const dispatch = useAppDispatch()
  const t = useTranslation()

  const handleOnClickSettings = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    dispatch(setSettingsVisible(true))
  }

  const menus = [
    {
      icon: 'icon-plus-square',
      title: 'add.data.connections',
      content: <SelectConnection />,
    },
    { icon: 'icon-iconconnection', title: 'connections', content: <Connections /> },
    { icon: 'icon-Settings', title: 'settings', onClick: handleOnClickSettings },
  ]

  return (
    <Flex
      className={styles.slider}
      vertical
      justify="flex-start"
      align="flex-start"
      style={{ backgroundColor: primaryColor }}
    >
      <Flex vertical justify="center" align="center" gap={size}>
        {menus.map((menu) => (
          <SliderMenu
            key={menu.title}
            title={t(menu.title)}
            icon={menu.icon}
            content={menu.content}
            onClick={menu.onClick}
          />
        ))}
      </Flex>
    </Flex>
  )
}

export default GlobalSlider
