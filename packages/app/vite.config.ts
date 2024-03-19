import { defineConfig } from 'vite'
import reactPlugin from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    sourcemap: true,
    lib: {
      entry: 'src/index.ts',
      name: '@db-gui/app',
      fileName: (format) => `index.${format}.js`,
    },
  },
  plugins: [
    reactPlugin(),
    dts({
      include: ['src'],
    }),
  ],
})
