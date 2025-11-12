import {fileURLToPath} from 'node:url';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd(), '');
  return {
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
      'import.meta.env.VITE_SUFFIX': JSON.stringify(env.VITE_SUFFIX ?? ''),
    },
    server: {
      cors: true,
      host: true,
      port: 3000,
    },
  };
});
