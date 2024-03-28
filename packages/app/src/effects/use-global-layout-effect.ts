import { useAppSelector, useMediaQuery } from '../hooks'
import { theme as resourceAntdTheme, type ConfigProviderProps } from 'antd'
import { THEME_MODE, DARK_MEDIA_QUERY } from '@db-gui/core'
import { antdLocales, i18nConfig } from '../config'
import { RootState } from '../store'

function handleOnAppChange(before: RootState['app'], after: RootState['app']) {
  if (after.theme.lang) {
    i18nConfig.changeLanguage(after.theme.lang)
  }
  return after === before
}

export default function useGlobalLayoutEffect() {
  const { theme } = useAppSelector(
    (state) => state.app,
    (before, after) => handleOnAppChange(before, after),
  )

  const { enable: darkQueryEnable } = useMediaQuery(DARK_MEDIA_QUERY)

  const isDark = theme.mode === THEME_MODE.system ? darkQueryEnable : theme.mode === THEME_MODE.dark
  const configProviderProps: ConfigProviderProps = {
    componentSize: theme.size,
    locale: antdLocales?.[theme.lang],
    theme: {
      algorithm: isDark ? resourceAntdTheme.darkAlgorithm : resourceAntdTheme.defaultAlgorithm,
      token: {
        colorPrimary: theme.primaryColor,
      },
    },
  }

  return {
    configProviderProps,
    isDark,
  }
}
