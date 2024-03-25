import { defineConfig } from 'vite'
import legacyPlugin from '@vitejs/plugin-legacy'
import * as path from 'path'

export default defineConfig((config) => {
  const envDir = '../../env'
  const isDevelopment = config.mode === 'development'
  const wdyr = path.resolve(
    __dirname,
    isDevelopment
      ? 'node_modules/@welldone-software/why-did-you-render'
      : 'src/__mocks__/@welldone-software/why-did-you-render/index.ts',
  )
  const reduxLogger = path.resolve(
    __dirname,
    isDevelopment ? 'node_modules/redux-logger' : 'src/__mocks__/redux-logger/index.ts',
  )

  return {
    base: './',
    envDir,
    server: {
      port: 3333,
    },
    resolve: {
      alias: {
        '@welldone-software/why-did-you-render': wdyr,
        'redux-logger': reduxLogger,
      },
    },
    build: {
      sourcemap: true,
    },
    plugins: [
      legacyPlugin({
        targets: ['> 0.5%', 'ie >= 11'],
      }),
    ],
  }
})
