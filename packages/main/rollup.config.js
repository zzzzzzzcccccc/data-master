const pkg = require('./package.json')
const resolve = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const typescript = require('@rollup/plugin-typescript')

const commonConfiguration = {
  external: ['electron'],
  plugins: [
    resolve({
      extensions: ['.ts'],
    }),
    typescript(),
    commonjs(),
  ],
}

module.exports = [
  {
    input: 'src/index.ts',
    output: [
      {
        name: pkg.name,
        format: 'esm',
        file: pkg.module,
        sourcemap: true,
      },
      {
        name: pkg.name,
        format: 'cjs',
        file: pkg.cjs,
        sourcemap: true,
      },
    ],
    ...commonConfiguration,
  },
  {
    input: 'src/preload.ts',
    output: [
      {
        name: `${pkg.name}_preload`,
        format: 'cjs',
        file: './dist/preload.js',
        sourcemap: true,
      },
    ],
    ...commonConfiguration,
  },
]
