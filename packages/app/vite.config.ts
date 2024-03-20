import { defineConfig } from 'vite'
import legacyPlugin from '@vitejs/plugin-legacy'
import * as fs from 'fs'
import * as path from 'path'

function getRollupOptionsInput() {
  const root = path.resolve(__dirname)

  return fs
    .readdirSync(root)
    .filter((file) => file.endsWith('.html'))
    .reduce(
      (acc, html) => {
        return {
          ...acc,
          [html.split('.')[0]]: path.resolve(root, html),
        }
      },
      {} as Record<string, string>,
    )
}

export default defineConfig(() => {
  const envDir = '../../env'
  const input = getRollupOptionsInput()

  return {
    base: './',
    envDir,
    server: {
      port: 3333,
    },
    build: {
      sourcemap: true,
      rollupOptions: {
        input,
      },
    },
    plugins: [
      legacyPlugin({
        targets: ['> 0.5%', 'ie >= 11'],
      }),
    ],
  }
})
