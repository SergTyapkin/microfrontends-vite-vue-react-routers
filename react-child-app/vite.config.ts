import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';


export default defineConfig(({command, mode}: {command: string, mode: 'development' | 'production'}) => ({
  plugins: [
    react(),
    federation({
      name: 'reactChildApp',
      filename: 'remoteEntryPoint.js',
      exposes: {
        './App': './src/views/App',
      },
      remotes: {},
      shared: ['react', 'react-dom', 'react-router-dom'],
    }),
  ],
  server: {
    // https: true,
    port: 5001,

    proxy: (mode === 'development' ? {
      '/assets': {
        target: `http://localhost:5001/dist`,
        secure: false,
        changeOrigin: false,
        // rewrite: (path) => path.replace(/^\/assets/, '/dist/assets'),
      },
    } : {})
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  }
}));
