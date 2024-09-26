import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import basicSsl from '@vitejs/plugin-basic-ssl';
import path from 'path';
import federation from '@originjs/vite-plugin-federation';


export default defineConfig({
  plugins: [
    Vue({
      include: [/\.vue$/],
    }),
    // basicSsl(),
    federation({
      name: 'host',
      remotes: {
        reactChildApp: 'http://localhost:5001/assets/remoteEntryPoint.js',
        vueChildApp: 'http://localhost:5002/assets/remoteEntryPoint.js',
      },
      shared: ['vue', 'vue-router', 'vuex', 'react', 'react-dom'],
    }),
  ],
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
  },
});
