import path from 'path'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import json from '@rollup/plugin-json'
import { terser } from 'rollup-plugin-terser'

function resolveInput(projectDir) {
  return path.resolve('packages', `${projectDir}/src/index.ts`)
}

function resolveOnput(projectDir) {
  return path.resolve('packages', `${projectDir}/dist/index.js`)
}

const PKG_DIR = process.env.PKG_DIR
const pkgMeta = require(path.resolve(`packages`, `${PKG_DIR}/package.json`))

export default {
  input: resolveInput(PKG_DIR),
  output: {
    file: resolveOnput(PKG_DIR),
    format: 'cjs'
  },
  external(id) {
    return pkgMeta.dependencies && !!pkgMeta.dependencies[id]
  },
  plugins: [
    resolve(),
    commonjs(),
    typescript({ useTsconfigDeclarationDir: true }),
    json(),
    terser()
  ]
}
