import React from 'React'
import * as monaco from 'monaco-editor'

export interface SqlEditorProps {
  className?: string
  style?: React.CSSProperties
  defaultValue?: string
  onChange?: (
    value: string,
    instance: monaco.editor.IStandaloneCodeEditor,
    event: monaco.editor.IModelContentChangedEvent,
  ) => void
}
