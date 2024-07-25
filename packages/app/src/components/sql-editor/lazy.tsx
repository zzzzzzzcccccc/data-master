import React from 'react'
import { Spin } from 'antd'
import { SqlEditorProps } from './types'

const SqlEditor = React.lazy(() => import('./sql-editor'))

function LazyCodeEditor(props: SqlEditorProps) {
  return (
    <React.Suspense fallback={<Spin />}>
      <SqlEditor {...props} />
    </React.Suspense>
  )
}

export default LazyCodeEditor
