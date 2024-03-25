import React from 'react'
import { ConfigProvider, App } from 'antd'
import { Outlet } from 'react-router-dom'
import { useGlobalLayoutEffect } from '../../effects'

function GlobalLayout() {
  const { antdTheme, isLoading, isError } = useGlobalLayoutEffect()
  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Sometime error</div>
  }

  return (
    <ConfigProvider theme={antdTheme}>
      <App>
        <Outlet />
      </App>
    </ConfigProvider>
  )
}

export default GlobalLayout
