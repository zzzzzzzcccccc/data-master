import React from 'React'
import { LanguageIdEnum } from 'monaco-sql-languages'

export interface SqlEditorProps {
  language?: LanguageIdEnum
  className?: string
  style?: React.CSSProperties
  defaultValue?: string
}
