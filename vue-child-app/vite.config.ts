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
        name: env.VITE_CHILD_APP_2_NAME,
        filename: env.VITE_CHILD_APP_2_OUT_FILE_NAME,
        exposes: {
          './App': './src/mountApp',
        },
        remotes: {},
        // shared: ['vue', 'vue-router', 'vuex'],
      }),
    ].concat((env.VITE_CHILD_APP_2_HTTPS === 'true') ? [
      basicSsl(),
    ] : []),


    server: {
      https: (env.VITE_CHILD_APP_2_HTTPS === 'true') ? {} : null,
      port: Number(env.VITE_CHILD_APP_2_PORT),

      proxy: (mode === 'development' ? {
        [`^/(assets|assets-${env.VITE_CHILD_APP_2_NAME})/`]: {
          target: `${env.VITE_CHILD_APP_2_HTTPS === 'true' ? 'https' : 'http'}://localhost:${env.VITE_CHILD_APP_2_PORT}/dist`,
          secure: (env.VITE_CHILD_APP_2_HTTPS === 'true'),
          changeOrigin: false,
          // rewrite: (path) => path.replace(/^\/assets/, '/dist/assets'),
        },
      } : {})
    },

    resolve: {
      alias: [
        {
          find: '~', // to use ~ as project root like: 'import Some from '~/components/Some.vue''
          replacement: path.resolve(__dirname, 'src')
        },
        {
          find: '@~', // to use @~ as node_modules root like: 'import Some from '@~/Some''
          replacement: path.resolve(__dirname, 'node_modules')
        }
      ]
    },

    publicDir: path.resolve(__dirname, '..', 'shared-res', 'shared-public'),
    build: {
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo: { name: string }) => {
            let dir = 'assets';
            let extType = assetInfo.name.split('.')[1];

            if (/png|jpe?g|svg|gif|tiff|bmp|ico|ttf|woff/i.test(extType)) {
              dir = env.VITE_CHILD_APP_2_ASSETS_FOLDER_NAME;
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
    },
  }
});
