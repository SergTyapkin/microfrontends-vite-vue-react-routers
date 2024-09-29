import {defineConfig, loadEnv} from 'vite';
import Vue from '@vitejs/plugin-vue';
import basicSsl from '@vitejs/plugin-basic-ssl';
import * as path from 'path';
import federation from '@originjs/vite-plugin-federation';


export default defineConfig(({command, mode}: {
  command: 'build' | 'serve',
  mode: 'development' | 'production' | string,
}) => {
  const env = loadEnv(mode, path.resolve(__dirname, '..'));
  console.log(`Loaded env file(s) from: ${path.resolve(__dirname, '..')}:`, env);

  return {
    plugins: [
      Vue({
        include: [/\.vue$/],
      }),
      federation({
        name: 'host',
        remotes: {
          [env.VITE_CHILD_APP_1_NAME]: `http://localhost:${env.VITE_CHILD_APP_1_PORT}/assets/remoteEntryPoint.js`,
          [env.VITE_CHILD_APP_2_NAME]: `http://localhost:${env.VITE_CHILD_APP_2_PORT}/assets/remoteEntryPoint.js`,
        },
        shared: ['vue', 'vue-router', 'vuex'],
      }),
    ].concat((env.VITE_HOST_APP_HTTPS === 'true') ? [
      basicSsl(),
    ] : []),

    server: {
      https: (env.VITE_HOST_APP_HTTPS === 'true') ? {} : null,

      proxy: {
        [`/assets-${env.VITE_CHILD_APP_1_NAME}`]: {
          target: `http://localhost:${env.VITE_CHILD_APP_1_PORT}`,
          secure: false,
          changeOrigin: false,
          // rewrite: (path) => path.replace(/^\/assets/, '/dist/assets'),
        },
        [`/assets-${env.VITE_CHILD_APP_2_NAME}`]: {
          target: `http://localhost:${env.VITE_CHILD_APP_2_PORT}`,
          secure: false,
          changeOrigin: false,
          // rewrite: (path) => path.replace(/^\/assets/, '/dist/assets'),
        },
      },
    },

    define: {
      'DEFINE_VITE_IMPORT_APP_1_NAME': JSON.stringify(`${env.VITE_CHILD_APP_1_NAME}/App`),
      // 'DEFINE_VITE_IMPORT_APP_2_NAME': `${env.VITE_CHILD_APP_2_PORT}\/App`,
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
      modulePreload: false,
      target: 'esnext',
      minify: true,
      sourcemap: true,
      manifest: true,
      cssCodeSplit: false,
    },
  }
});
