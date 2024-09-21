import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import basicSsl from '@vitejs/plugin-basic-ssl';
import path from 'path';
import federation from '@originjs/vite-plugin-federation';
// import { dependencies } from 'package.json';
// const {dependencies} = require('./package.json');


export default defineConfig(({command, mode}) => ({
  plugins: [
    Vue({
      include: [/\.vue$/],
    }),
    // basicSsl(),
    federation({
      name: 'sidebar',
      filename: 'remoteEntryPoint.js',
      exposes: {
        './App': './src/App',
      },
      remotes: {},
      // shared: ['vue', 'vue-loader', 'vue-template-compiler', 'vue-router', 'vuex'],
      // shared: dependencies,
    }),
  ],
  server: {
    // https: true,
    port: 5002,

    proxy: (mode === 'development' ? {
      '/assets': {
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
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  }
}));
