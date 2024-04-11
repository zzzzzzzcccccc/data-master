import React from 'react'
import { SqlEditorProps } from './types'

const SqlEditor = React.lazy(() => import('./sql-editor'))

function LazyCodeEditor(props: SqlEditorProps) {
  return (
    <React.Suspense>
      <SqlEditor {...props} />
    </React.Suspense>
  )
}

export default LazyCodeEditor
