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

  const app1url = `${env.VITE_CHILD_APP_1_HTTPS === 'true' ? 'https' : 'http'}://${env.VITE_DOMAIN_URL}:${env.VITE_CHILD_APP_1_PORT}`;
  const app2url = `${env.VITE_CHILD_APP_2_HTTPS === 'true' ? 'https' : 'http'}://${env.VITE_DOMAIN_URL}:${env.VITE_CHILD_APP_2_PORT}`;
  return {
    plugins: [
      Vue({
        include: [/\.vue$/],
      }),
      federation({
        name: 'host',
        remotes: {
          [env.VITE_CHILD_APP_1_NAME]: `/${env.VITE_CHILD_APP_1_OUT_FILE_PATH}/${env.VITE_CHILD_APP_1_OUT_FILE_NAME}`,
          [env.VITE_CHILD_APP_2_NAME]: `/${env.VITE_CHILD_APP_2_OUT_FILE_PATH}/${env.VITE_CHILD_APP_2_OUT_FILE_NAME}`,
        },
        // shared: ['vue', 'vue-router', 'vuex'],
      }),
    ].concat((env.VITE_HOST_APP_HTTPS === 'true') ? [
      basicSsl(),
    ] : []),

    server: {
      https: (env.VITE_HOST_APP_HTTPS === 'true') ? {} : null,

      proxy: {
        [`/assets-${env.VITE_CHILD_APP_1_NAME}`]: {
          target: app1url,
          secure: (env.VITE_CHILD_APP_1_HTTPS === 'true'),
          changeOrigin: false,
          // rewrite: (path) => path.replace(/^\/assets/, '/dist/assets'),
        },
        [`/assets-${env.VITE_CHILD_APP_2_NAME}`]: {
          target: app2url,
          secure: (env.VITE_CHILD_APP_2_HTTPS === 'true'),
          changeOrigin: false,
          // rewrite: (path) => path.replace(/^\/assets/, '/dist/assets'),
        },

        [`/${env.VITE_CHILD_APP_1_OUT_FILE_PATH}/`]: {
          target: app1url,
          secure: (env.VITE_CHILD_APP_1_HTTPS === 'true'),
          changeOrigin: false,
          rewrite: (path) => path.replace(`/${env.VITE_CHILD_APP_1_OUT_FILE_PATH}/`, '/assets/'),
        },
        [`/${env.VITE_CHILD_APP_2_OUT_FILE_PATH}/`]: {
          target: app2url,
          secure: (env.VITE_CHILD_APP_2_HTTPS === 'true'),
          changeOrigin: false,
          rewrite: (path) => path.replace(`/${env.VITE_CHILD_APP_2_OUT_FILE_PATH}/`, '/assets/'),
        },
      },
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
