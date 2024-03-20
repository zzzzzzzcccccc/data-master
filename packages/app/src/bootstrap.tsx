import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'

export default function bootstrap() {
  const injector = document.getElementById('root')
  if (injector) {
    ReactDOM.createRoot(injector).render(<App />)
  }
}
