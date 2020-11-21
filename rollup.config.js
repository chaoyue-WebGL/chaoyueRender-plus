import path from 'path'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import json from '@rollup/plugin-json'
import { terser } from 'rollup-plugin-terser'

const PKG_DIR = process.env.PKG_DIR
const pkg = require(path.resolve(`packages`, `${PKG_DIR}/package.json`))

export default {
  input: path.resolve('packages', `${PKG_DIR}/src/index.ts`),
  output: [
    {
      file: path.resolve('packages', `${PKG_DIR}/dist/index.cjs.js`),
      format: 'cjs',
      exports: 'named'
    },
    {
      file: path.resolve('packages', `${PKG_DIR}/dist/index.esm.js`),
      format: 'esm'
    }
  ],
  external(id) {
    return pkg.dependencies && !!pkg.dependencies[id]
  },
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      cacheRoot: path.resolve(__dirname, 'node_modules/.rts2_cache')
    }),
    json(),
    terser()
  ]
}
