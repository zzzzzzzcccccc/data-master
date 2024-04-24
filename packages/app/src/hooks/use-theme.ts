import { type ConfigProviderProps, theme as resourceAntdTheme, theme as antdTheme } from 'antd'
import { useAppSelector } from './use-store'
import useMediaQuery from './use-media-query'
import { THEME_MODE, DARK_MEDIA_QUERY } from '@dm/core'
import { antdLocales } from '../config'

export default function useTheme() {
  const theme = useAppSelector((state) => state.app.theme)
  const { token: antdToken } = antdTheme.useToken()
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
    antdToken,
    theme,
    isDark,
    configProviderProps,
  }
}
