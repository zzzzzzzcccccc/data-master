const pkg = require('./package.json')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const typescript = require('@rollup/plugin-typescript')
const json = require('@rollup/plugin-json')

module.exports = {
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
  plugins: [
    nodeResolve({
      preferBuiltins: false,
    }),
    json(),
    typescript(),
    commonjs(),
  ],
}
