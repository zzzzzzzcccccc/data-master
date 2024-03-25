import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store'
import { App } from './components'
import { getPreloadInjector } from './utils'
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
    setDeviceInfo(injector)

    ReactDOM.createRoot(injector).render(
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>,
    )
  }
}
