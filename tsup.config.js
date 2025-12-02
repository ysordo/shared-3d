// tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig([
  // Cliente principal
  {
    entry: {
      index: 'src/index.ts',
      lib: 'src/lib/index.ts',
    },
    format: ['esm', 'cjs'],
    dts: true,
    splitting: true,
    sourcemap: true,
    clean: true,
    minify: true,
    treeshake: true,
    external: ['react', 'react-dom', 'three'],
    outDir: 'dist',
  },
  // Servidor (next.config.js)
  {
    entry: {
      server: 'src/core/cache/server/index.server.ts',
    },
    format: ['cjs'],
    platform: 'node',
    target: 'node18',
    outDir: 'dist',
    noExternal: [/.*/],
  },
]);