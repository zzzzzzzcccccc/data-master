import React from 'react'
import ReactDOM from 'react-dom/client'

export type BootstrapOptions = {
  injector: HTMLElement
}

function App() {
  return (
    <div>
      <h1>Hello, World!</h1>
    </div>
  )
}

export default function bootstrap(options: BootstrapOptions) {
  const { injector } = options

  ReactDOM.createRoot(injector).render(<App />)
}
