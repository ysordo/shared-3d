// tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig([
  // Cliente
  {
    entry: ['src/index.ts', 'src/lib/three.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    splitting: true,
    clean: true,
    outDir: 'dist',
    external: ['react', 'react-dom', 'three'],
  },
  // Servidor
  {
    entry: {
      'server/index': 'src/core/cache/server/index.server.ts', // ← CLAVE
    },
    format: ['esm', 'cjs'],
    dts: true,
    platform: 'node',
    target: 'node18',
    outDir: 'dist',
    noExternal: [/.*/],
    splitting: false,
  },
]);
