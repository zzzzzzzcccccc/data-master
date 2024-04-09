import React from 'react'
import { useAppDispatch, useAppSelector, useTheme, useTranslation } from '../hooks'
import { setCurrentAddConnectionClient } from '../store'
import { CLIENT_NAMES } from '@dm/core'

function useSelectConnectionEffect() {
  const t = useTranslation()
  const { size } = useTheme()

  const { currentAddConnectionClient } = useAppSelector((state) => state.app)
  const dispatch = useAppDispatch()

  const list = Object.keys(CLIENT_NAMES).map((key) => {
    const item = CLIENT_NAMES[key as keyof typeof CLIENT_NAMES]
    return {
      key,
      icon: item.icon,
      label: t(key),
    }
  })

  const handleOnClick = (client: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    dispatch(setCurrentAddConnectionClient(client))
  }

  return {
    t,
    size,
    currentAddConnectionClient,
    list,
    handleOnClick,
  }
}

export default useSelectConnectionEffect
