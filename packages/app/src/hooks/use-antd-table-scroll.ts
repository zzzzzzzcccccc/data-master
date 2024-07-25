import { useState, useRef, useEffect, useCallback } from 'react'
import { SIZE } from '@dm/core'
import { useAppSelector } from './use-store'
import useTheme from './use-theme'

export const AntdTableScrollScene = {
  databaseDetail: 'databaseDetail',
  databaseQuery: 'databaseQuery',
} as const

export const AntdTableHeaderHeight = {
  [SIZE.small]: 39,
  [SIZE.middle]: 47,
  [SIZE.large]: 55,
}

type Options = {
  scene: keyof typeof AntdTableScrollScene
}

function useAntdTableScroll(options: Options) {
  const {
    theme: { size },
  } = useTheme()
  const [tableLayout, setTableLayout] = useState([0, 0])
  const { wh, tableDetailWidth } = useAppSelector((state) => state.container)

  const wrapperRef = useRef<HTMLDivElement | null>(null)

  const mathScrollByDetail = useCallback(() => {
    if (!wrapperRef.current) return
    const offsetHeight = Math.floor(wrapperRef.current?.offsetHeight || 0)

    if (options.scene === AntdTableScrollScene.databaseDetail) {
      const w = Math.floor(wh[0] - tableDetailWidth)
      const h = Math.floor(offsetHeight - AntdTableHeaderHeight[size])
      setTableLayout([w, h])
    }

    if (options.scene === AntdTableScrollScene.databaseQuery) {
      const w = Math.floor(wh[0])
      const h = Math.floor(offsetHeight - AntdTableHeaderHeight[size])
      setTableLayout([w, h])
    }
  }, [options.scene, size, tableDetailWidth, wh])

  useEffect(() => {
    mathScrollByDetail()
  }, [options.scene, wh, tableDetailWidth, size, mathScrollByDetail])

  return {
    scroll: { x: tableLayout[0], y: tableLayout[1] },
    wrapperRef,
  }
}

export default useAntdTableScroll
