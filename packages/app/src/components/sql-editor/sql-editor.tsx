import React, { useRef, useEffect, useCallback, useMemo } from 'react'
import { DARK_MEDIA_QUERY, THEME_MODE } from '@dm/core'
import { useAppSelector, useMediaQuery, useMount } from '../../hooks'
import * as monaco from 'monaco-editor'
import { SqlEditorProps } from './types'

function SqlEditor(props: SqlEditorProps) {
  const { className, style, defaultValue = '', onChange } = props
  const { theme } = useAppSelector((state) => state.app)
  const { enable: darkQueryEnable } = useMediaQuery(DARK_MEDIA_QUERY)

  const targetRef = useRef<HTMLDivElement | null>(null)
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)

  const codeOptions = useMemo(() => {
    const isDark = theme.mode === THEME_MODE.system ? darkQueryEnable : theme.mode === THEME_MODE.dark
    return {
      language: 'typescript',
      theme: isDark ? 'vs-dark' : 'vs-light',
      automaticLayout: true,
      minimap: {
        enabled: false,
      },
      tabSize: 2,
    }
  }, [theme, darkQueryEnable])

  const disposeEditor = useCallback(() => {
    if (editorRef.current) {
      editorRef.current?.dispose()
      editorRef.current = null
    }
  }, [])

  const renderEditor = useCallback(
    (target: HTMLElement) => {
      if (!editorRef.current) {
        editorRef.current = monaco.editor.create(target, {
          value: defaultValue,
          ...codeOptions,
        })
        editorRef.current.onDidChangeModelContent((event) => {
          if (editorRef.current) {
            onChange?.(editorRef.current.getValue(), editorRef.current, event)
          }
        })
      }
    },
    [codeOptions, defaultValue, onChange],
  )

  useMount(() => {
    if (targetRef.current) {
      renderEditor(targetRef.current)
    }
    return () => {
      disposeEditor()
    }
  })

  useEffect(() => {
    editorRef.current?.updateOptions(codeOptions)
  }, [codeOptions])

  return <div ref={targetRef} className={className} style={style} />
}

export default SqlEditor
