// tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig([
  // Cliente principal
  {
    entry: [
      'src/index.ts',
      'src/react/**/*.{tsx,ts}',
      'src/hooks/**/*.ts',
      'src/core/**/*.ts',
      'src/context/**/*.{tsx,ts}',
      'src/lib/three.ts',
    ],
    format: ['esm', 'cjs'],
    dts: true,
    splitting: true,
    clean: true,
    outDir: 'dist',
    external: ['react', 'react-dom', 'three'],
  },
]);