import {fileURLToPath} from 'node:url';
import {defineConfig} from 'vite';

export default defineConfig(({mode}) => ({
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/strategy.ts', import.meta.url)),
      formats: ['es'],
    },
    emptyOutDir: true,
    minify: mode === 'production',
    sourcemap: mode === 'development',
    rollupOptions: {
      external: ['home-assistant-js-websocket'],
    },
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(mode),
  },
  server: {
    cors: true,
    host: true,
    port: 3000,
  },
}));
