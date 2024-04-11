import React, { useRef, useEffect, useCallback } from 'react'
import { DARK_MEDIA_QUERY, THEME_MODE } from '@dm/core'
import { useAppSelector, useMediaQuery } from '../../hooks'
import { LanguageIdEnum } from 'monaco-sql-languages'
import * as monaco from 'monaco-editor'
import { SqlEditorProps } from './types'

function SqlEditor(props: SqlEditorProps) {
  const { className, style, language = LanguageIdEnum.MYSQL, defaultValue = '' } = props
  const { theme } = useAppSelector((state) => state.app)
  const { enable: darkQueryEnable } = useMediaQuery(DARK_MEDIA_QUERY)

  const targetRef = useRef<HTMLDivElement | null>(null)
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)

  const disposeEditor = useCallback(() => {
    if (editorRef.current) {
      editorRef.current?.dispose()
      editorRef.current = null
    }
  }, [])

  const renderEditor = useCallback(
    (target: HTMLElement) => {
      const isDark = theme.mode === THEME_MODE.system ? darkQueryEnable : theme.mode === THEME_MODE.dark
      disposeEditor()
      editorRef.current = monaco.editor.create(target, {
        value: defaultValue,
        language,
        theme: isDark ? 'vs-dark' : 'vs-light',
        automaticLayout: true,
        minimap: {
          enabled: false,
        },
        tabSize: 2,
      })
    },
    [disposeEditor, language, darkQueryEnable, defaultValue, theme.mode],
  )

  useEffect(() => {
    if (targetRef.current) {
      renderEditor(targetRef.current)
      editorRef.current?.focus()
    }
    return () => {
      disposeEditor()
    }
  }, [renderEditor, disposeEditor, language, darkQueryEnable, defaultValue, theme.mode])

  return <div ref={targetRef} className={className} style={style} />
}

export default SqlEditor
