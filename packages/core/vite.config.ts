import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    sourcemap: true,
    lib: {
      entry: 'src/index.ts',
      name: '@db-gui/core',
      fileName: (format) => `index.${format}.js`,
    },
  },
  plugins: [
    dts({
      include: ['src'],
    }),
  ],
})
