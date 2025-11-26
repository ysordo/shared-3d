import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/lib/three.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  minify: true,
  treeshake: true,
  external: ['react', 'react-dom', 'three'],
});