import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import * as path from 'path';


export default defineConfig(({command, mode}: {command, mode: 'development' | 'production'}) => ({
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
      '^/assets': {
        target: `http://localhost:5001/dist`,
        secure: false,
        changeOrigin: false,
        // rewrite: (path) => path.replace(/^\/assets/, '/dist/assets'),
      },
    } : {})
  },

  resolve: {
    alias: [
      {
        find: '~', // to use ~ as project root like: "import Some from '~/components/Some.vue'"
        replacement: path.resolve(__dirname, 'src')
      },
      {
        find: '@~', // to use @~ as node_modules root like: "import Some from '@~/Some'"
        replacement: path.resolve(__dirname, 'node_modules')
      }
    ]
  },

  publicDir: path.resolve(__dirname, "..", "shared-res", "shared-public"),
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo: {name: string}) => {
          let dir = 'assets';
          let extType = assetInfo.name.split('.')[1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            dir = 'assets-reactChildApp';
          }
          return `${dir}/[name]-[hash][extname]`;
        }
      }
    },
    modulePreload: false,
    target: 'esnext',
    minify: true,
    sourcemap: true,
    manifest: true,
    cssCodeSplit: false,
  }
}));
