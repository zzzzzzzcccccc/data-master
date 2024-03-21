import React from 'react'
import { ConfigProvider, App } from 'antd'
import { type InitializeProviderProps } from './types'
import Context from './context'

function InitializeProvider(props: InitializeProviderProps) {
  return (
    <Context.Provider value={{}}>
      <ConfigProvider>
        <App>{props.children}</App>
      </ConfigProvider>
    </Context.Provider>
  )
}

export default InitializeProvider
