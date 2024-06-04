import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'
import postcss from 'rollup-plugin-import-css'
import copy from 'rollup-plugin-copy'

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/bundle.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/bundle.min.js',
        format: 'iife',
        name: 'version',
        plugins: [terser()],
      },
    ],
    plugins: [
      resolve({
        extensions: ['.ts', '.tsx'],
        skip: ['react', 'react-dom'],
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
      }),
      postcss({ extensions: ['.css'], inject: true, extract: false }),
      copy({
        targets: [
          { src: 'package.json', dest: 'dist' },
          { src: 'README.md', dest: 'dist' },
        ],
      }),
    ],
    external: ['react', 'react-dom', 'react/jsx-runtime'],
  },
]
