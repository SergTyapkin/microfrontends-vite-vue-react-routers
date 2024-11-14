import {defineConfig, loadEnv} from 'vite';
import pluginReact from '@vitejs/plugin-react';
import pluginBasicSsl from '@vitejs/plugin-basic-ssl';
import pluginFederation from '@originjs/vite-plugin-federation';
import * as path from 'path';
import {PreRenderedAsset} from "rollup";


export default defineConfig(({mode}: {
  command: 'build' | 'serve',
  mode: 'development' | 'production' | string,
}) => {
  const env = loadEnv(mode, path.resolve(__dirname, '..'));
  console.log(`Loaded env file(s) from: ${path.resolve(__dirname, '..')}:`, env);

  return {
    plugins: [
      pluginReact(),
      pluginFederation({
        name: env.VITE_CHILD_APP_1_NAME,
        filename: env.VITE_CHILD_APP_1_OUT_FILE_NAME,
        exposes: {
          './App': './src/views/App',
        },
        remotes: {},
        // shared: ['react', 'react-dom', 'react-router-dom'],
      }),
    ].concat((env.VITE_CHILD_APP_1_HTTPS === 'true') ? [
      pluginBasicSsl(),
    ] : []),

    server: {
      https: (env.VITE_CHILD_APP_1_HTTPS === 'true') ? {} : null,
      port: Number(env.VITE_CHILD_APP_1_PORT),

      proxy: (mode === 'development' ? {
        [`^/(assets|assets-${env.VITE_CHILD_APP_1_NAME})/`]: {
          target: `${env.VITE_CHILD_APP_1_HTTPS === 'true' ? 'https' : 'http'}://localhost:${env.VITE_CHILD_APP_1_PORT}/dist`,
          secure: (env.VITE_CHILD_APP_1_HTTPS === 'true'),
          changeOrigin: false,
          // rewrite: (path) => path.replace(/^\/assets/, '/dist/assets'),
        },
      } : {})
    },

    resolve: {
      alias: [
        {
          find: '~', // to use ~ as project root like: "import Some from '~/components/Some.vue'"
          replacement: path.resolve(__dirname, 'src'),
        },
        {
          find: '#', // to use # as static root like: "import SomeResource from '#/icons/SomeResource.png'"
          replacement: path.resolve(__dirname, 'static'),
        },
        {
          find: '@node_modules', // to use @node_modules as node_modules root like: "import Some from '@node_modules/Some'"
          replacement: path.resolve(__dirname, 'node_modules'),
        },
      ],
    },

    publicDir: path.resolve(__dirname, '..', 'shared-res', 'shared-public'),
    build: {
      rollupOptions: {
        output: {
          // chunkFileNames: (assetInfo: PreRenderedChunk) => {
          //   console.log("INFO", assetInfo.name)
          //   return `${assetInfo.name}.js`;
          // },
          assetFileNames: (assetInfo: PreRenderedAsset) => {
            let dir = 'assets';
            let extType = assetInfo.name.split('.')[1];

            if (/png|jpe?g|svg|gif|tiff|bmp|ico|ttf|woff/i.test(extType)) {
              dir = env.VITE_CHILD_APP_1_ASSETS_FOLDER_NAME;
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
  };
});
