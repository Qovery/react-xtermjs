import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'
import postcss from 'rollup-plugin-import-css'

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/index.min.js',
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
        declaration: true,
        declarationDir: 'dist',
        rootDir: 'src',
      }),
      postcss({ extensions: ['.css'], inject: true, extract: false }),
    ],
    external: ['react', 'react-dom', 'react/jsx-runtime'],
  },
]
