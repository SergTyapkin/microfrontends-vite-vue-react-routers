import {defineConfig, loadEnv} from 'vite';
import Vue from '@vitejs/plugin-vue';
import pluginBasicSsl from '@vitejs/plugin-basic-ssl';
import * as path from 'path';
import pluginFederation from '@originjs/vite-plugin-federation';



export default defineConfig(({mode}: {
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
      pluginFederation({
        name: env.VITE_CHILD_APP_2_NAME,
        filename: env.VITE_CHILD_APP_2_OUT_FILE_NAME,
        exposes: {
          './App': './src/mountApp',
        },
        remotes: {},
        // shared: ['vue', 'vue-router', 'vuex'],
      }),
    ].concat((env.VITE_CHILD_APP_2_HTTPS === 'true') ? [
      pluginBasicSsl(),
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
          find: '~/', // to use ~ as project root like: "import Some from '~/components/Some.vue'"
          replacement: path.resolve(__dirname, 'src/'),
        },
        {
          find: '#/', // to use # as static root like: "import SomeResource from '#/icons/SomeResource.png'"
          replacement: path.resolve(__dirname, 'static/'),
        },
        {
          find: '@node_modules/', // to use @node_modules as node_modules root like: "import Some from '@node_modules/Some'"
          replacement: path.resolve(__dirname, 'node_modules/'),
        },
      ],
    },

    publicDir: path.resolve(__dirname, '..', 'shared-res', 'shared-public'),
    build: {
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo: { name: string }) => {
            let dir = 'assets';
            const extType = assetInfo.name.split('.')[1];

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
