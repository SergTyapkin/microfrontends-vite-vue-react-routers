import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import basicSsl from '@vitejs/plugin-basic-ssl';
import * as path from 'path';
import federation from '@originjs/vite-plugin-federation';


export default defineConfig(({command, mode}: {command: "build" | "serve", mode: 'development' | 'production'}) => ({
  plugins: [
    Vue({
      include: [/\.vue$/],
    }),
    // basicSsl(),
    federation({
      name: 'vueChildApp',
      filename: 'remoteEntryPoint.js',
      exposes: {
        './App': './src/mountApp',
      },
      remotes: {},
      shared: ['vue', 'vue-router', 'vuex'],
      // shared: dependencies,
    }),
  ],

  server: {
    // https: true,
    port: 5002,

    proxy: (mode === 'development' ? {
      '^/assets': {
        target: `http://localhost:5002/dist`,
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
        assetFileNames: (assetInfo) => {
          let dir = 'assets';
          let extType = assetInfo.name.split('.')[1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            dir = 'assets-vueChildApp';
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
