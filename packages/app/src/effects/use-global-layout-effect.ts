import { useEffect, useCallback } from 'react'
import { useAppDispatch, useAppSelector, useMediaQuery } from '../hooks'
import { type ThemeConfig, theme as resourceAntdTheme } from 'antd'
import { THEME_MODE, ASYNC_STATUS } from '@db-gui/core'
import { setStatus } from '../store'
import { i18nConfig } from '../config'

const DARK_MEDIA_QUERY = '(prefers-color-scheme: dark)'

export default function useGlobalLayoutEffect() {
  const { theme, status } = useAppSelector((state) => state.app)
  const dispatch = useAppDispatch()

  const { enable: darkQueryEnable } = useMediaQuery(DARK_MEDIA_QUERY)

  const isLoading = [ASYNC_STATUS.idle, ASYNC_STATUS.pending].includes(status)
  const isError = status === ASYNC_STATUS.rejected
  const isDark = theme.mode === THEME_MODE.system ? darkQueryEnable : theme.mode === THEME_MODE.dark
  const antdTheme: ThemeConfig = {
    algorithm: isDark ? resourceAntdTheme.darkAlgorithm : resourceAntdTheme.defaultAlgorithm,
  }

  const initialize = useCallback(() => {
    const mounted = async () => {
      if (status === ASYNC_STATUS.pending) return
      dispatch(setStatus(ASYNC_STATUS.pending))
      try {
        await i18nConfig.changeLanguage(theme.lang)
        return true
      } catch (e) {
        return Promise.reject(e)
      }
    }

    mounted()
      .then(() => dispatch(setStatus(ASYNC_STATUS.fulfilled)))
      .catch(() => dispatch(setStatus(ASYNC_STATUS.rejected)))
  }, [status, theme, dispatch])

  useEffect(() => {
    initialize()
  }, [initialize])

  return {
    isLoading,
    isError,
    antdTheme,
  }
}
