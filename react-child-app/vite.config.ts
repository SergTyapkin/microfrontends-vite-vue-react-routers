import {defineConfig, loadEnv} from 'vite';
import react from '@vitejs/plugin-react';
import basicSsl from '@vitejs/plugin-basic-ssl';
import federation from '@originjs/vite-plugin-federation';
import * as path from 'path';


export default defineConfig(({command, mode}: {
  command: 'build' | 'serve',
  mode: 'development' | 'production' | string,
}) => {
  const env = loadEnv(mode, path.resolve(__dirname, '..'));
  console.log(`Loaded env file(s) from: ${path.resolve(__dirname, '..')}:`, env);

  return {
    plugins: [
      react(),
      federation({
        name: env.VITE_CHILD_APP_1_NAME,
        filename: 'remoteEntryPoint.js',
        exposes: {
          './App': './src/views/App',
        },
        remotes: {},
        shared: ['react', 'react-dom', 'react-router-dom'],
      }),
    ].concat((env.VITE_CHILD_APP_1_HTTPS === 'true') ? [
      basicSsl(),
    ] : []),

    server: {
      https: (env.VITE_CHILD_APP_1_HTTPS === 'true') ? {} : null,
      port: Number(env.VITE_CHILD_APP_1_PORT),

      proxy: (mode === 'development' ? {
        '^/assets': {
          target: `http://localhost:${env.VITE_CHILD_APP_1_PORT}/dist`,
          secure: false,
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
