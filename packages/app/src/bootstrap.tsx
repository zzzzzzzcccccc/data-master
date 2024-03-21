import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './components'
import { getPreloadInjector } from './utils'
import { DeviceProvider, InitializeProvider } from './context'
import wdyr from '@welldone-software/why-did-you-render'

function setDeviceInfo(target: HTMLElement) {
  const { getDeviceInfo } = getPreloadInjector()
  const deviceInfo = getDeviceInfo()

  target.className = deviceInfo.platform

  return deviceInfo
}

function setupWhyDidRender() {
  if (import.meta.env.DEV) {
    wdyr(React, {
      trackAllPureComponents: true,
    })
  }
}

export default async function bootstrap() {
  setupWhyDidRender()

  const injector = document.getElementById('root')
  if (injector) {
    const deviceInfo = setDeviceInfo(injector)

    ReactDOM.createRoot(injector).render(
      <React.StrictMode>
        <DeviceProvider deviceInfo={deviceInfo}>
          <InitializeProvider>
            <App />
          </InitializeProvider>
        </DeviceProvider>
      </React.StrictMode>,
    )
  }
}
