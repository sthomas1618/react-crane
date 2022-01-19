import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import summary from 'rollup-plugin-summary'
import { terser } from 'rollup-plugin-terser'
import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer'
import pkg from './package.json'

const external = Object.keys(pkg.dependencies).concat(Object.keys(pkg.peerDependencies))
const babelConfig = ({ useESModules }) => ({
  babelHelpers: 'runtime',
  exclude: ['node_modules/**', 'stories/**'],
  plugins: [['@babel/transform-runtime', { useESModules }], 'transform-react-remove-prop-types']
})
const globals = { ...pkg.dependencies, ...pkg.peerDependencies }

export default [
  {
    input: 'less/crane.less',
    output: [{ file: 'dist/crane.min.css' }],
    plugins: [
      postcss({
        extensions: ['.less'],
        extract: true,
        minimize: true,
        plugins: [autoprefixer]
      })
    ]
  },
  {
    input: pkg.source,
    output: [{ file: pkg.browser, format: 'umd', name: 'ReactCrane', globals }],
    plugins: [
      resolve(),
      babel(babelConfig({ useESModules: true })),
      commonjs(),
      terser(),
      summary()
    ],
    external
  },
  {
    input: pkg.source,
    output: [{ file: 'dist/crane.js', format: 'umd', name: 'ReactCrane', globals }],
    plugins: [resolve(), babel(babelConfig({ useESModules: true })), commonjs(), summary()],
    external
  },
  {
    input: pkg.source,
    output: [{ file: pkg.main, format: 'cjs' }],
    plugins: [resolve(), babel(babelConfig({ useESModules: false })), summary()],
    external
  },
  {
    input: pkg.source,
    output: [{ file: pkg.module, format: 'esm' }],
    plugins: [resolve(), babel(babelConfig({ useESModules: true })), summary()],
    external
  }
]
