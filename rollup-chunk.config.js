import path from 'path';
import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

const input = './src/index.js';
const external = id => !id.startsWith('.') && !path.isAbsolute(id);

export default [
  {
    input,
    output: {
      format: 'cjs',
      dir: './lib/',
      chunkFileNames: 'chunk-[hash].cjs.js',
      entryFileNames: 'index.cjs.js',
      exports: 'named',
    },
    external,
    plugins: [nodeResolve(), babel({ rootMode: 'upward' })],
  },
  {
    input,
    output: {
      format: 'esm',
      dir: './lib/',
      chunkFileNames: 'chunk-[hash].esm.js',
      entryFileNames: 'index.esm.js',
    },
    external,
    plugins: [
      nodeResolve(),
      babel({
        rootMode: 'upward',
        plugins: [
          [
            'babel-plugin-transform-rename-import',
            {
              replacements: [{ original: 'lodash', replacement: 'lodash-es' }],
            },
          ],
        ],
      }),
    ],
  },
];
