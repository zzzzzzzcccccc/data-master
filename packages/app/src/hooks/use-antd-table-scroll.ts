import { useState, useRef, useEffect } from 'react'
import { SIZE } from '@dm/core'
import { useAppSelector } from './use-store'
import useGetDatabaseTableName from './use-get-database-table-name'
import useTheme from './use-theme'

export const AntdTableScrollScene = {
  detail: 'detail',
} as const

export const AntdTableHeaderHeight = {
  [SIZE.small]: 39,
  [SIZE.middle]: 47,
  [SIZE.large]: 55,
}

type Options = {
  scene: keyof typeof AntdTableScrollScene
  isLoading: boolean
}

function useAntdTableScroll(options: Options) {
  const {
    theme: { size },
  } = useTheme()
  const tableName = useGetDatabaseTableName()
  const [tableLayout, setTableLayout] = useState([0, 0])
  const { wh, tableDetailWidth } = useAppSelector((state) => state.container)

  const wrapperRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (wrapperRef.current) {
      if (options.scene === AntdTableScrollScene.detail && tableName && !options.isLoading) {
        const offsetHeight = Math.floor(wrapperRef.current?.offsetHeight || 0)
        const w = Math.floor(wh[0] - tableDetailWidth)
        const h = Math.floor(offsetHeight - AntdTableHeaderHeight[size])
        setTableLayout([w, h])
      }
    }
  }, [options.scene, options.isLoading, wh, tableDetailWidth, tableName, size])

  return {
    scroll: { x: tableLayout[0], y: tableLayout[1] },
    wrapperRef,
  }
}

export default useAntdTableScroll
