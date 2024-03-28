import { type GlobalToken, theme as antdTheme } from 'antd'
import { useAppSelector } from './use-store'
import { RootState } from '../store'

type Result = GlobalToken & RootState['app']['theme']

export default function useTheme(): Result {
  const { theme } = useAppSelector((state) => state.app)
  const { token: antdToken } = antdTheme.useToken()

  return {
    ...antdToken,
    ...theme,
  } as Result
}
