import {defineConfig, loadEnv} from 'vite';
import pluginVue from '@vitejs/plugin-vue';
import pluginBasicSsl from '@vitejs/plugin-basic-ssl';
import * as path from 'path';
import pluginFederation from '@originjs/vite-plugin-federation';
import { VitePWA } from 'vite-plugin-pwa';
import { viteStaticCopy } from 'vite-plugin-static-copy';


export default defineConfig(({mode}: {
  command: 'build' | 'serve',
  mode: 'development' | 'production' | string,
}) => {
  const env = loadEnv(mode, path.resolve(__dirname, '..'));
  console.log(`Loaded env file(s) from: ${path.resolve(__dirname, '..')}:`, env);

  const app1url = `${env.VITE_CHILD_APP_1_HTTPS === 'true' ? 'https' : 'http'}://${env.VITE_DOMAIN_URL}:${env.VITE_CHILD_APP_1_PORT}`;
  const app2url = `${env.VITE_CHILD_APP_2_HTTPS === 'true' ? 'https' : 'http'}://${env.VITE_DOMAIN_URL}:${env.VITE_CHILD_APP_2_PORT}`;
  return {
    plugins: [
      pluginVue({
        include: [/\.vue$/],
      }),
      viteStaticCopy({
        targets: [
          { src: 'static/favicon.svg', dest: 'static' },
          { src: 'robots.txt', dest: '.' },
        ],
      }),
      VitePWA({
        registerType: 'prompt',
        manifest: {
          short_name: 'Frontend Template',
          name: 'Microfrontend app template',
          description: 'Some description of our service',
          icons: [
            {
              src: '/static/favicon.svg',
              sizes: '512x512',
              type: 'image/svg',
              purpose: 'maskable',
            },
          ],
          theme_color: '#181818',
          background_color: '#181818',
          display: 'standalone',
          id: '/?source=pwa',
          start_url: '/?source=pwa',
          scope: '/',
          prefer_related_applications: false,
          shortcuts: [
            {
              name: 'Home',
              short_name: 'Home',
              description: 'Our base page',
              url: '/?source=pwa',
            },
          ],
        },
      }),
      pluginFederation({
        name: 'host',
        remotes: {
          [env.VITE_CHILD_APP_1_NAME]: `/${env.VITE_CHILD_APP_1_OUT_FILE_PATH}/${env.VITE_CHILD_APP_1_OUT_FILE_NAME}`,
          [env.VITE_CHILD_APP_2_NAME]: `/${env.VITE_CHILD_APP_2_OUT_FILE_PATH}/${env.VITE_CHILD_APP_2_OUT_FILE_NAME}`,
        },
        // shared: ['vue', 'vue-router', 'vuex'],
      }),
    ].concat((env.VITE_HOST_APP_HTTPS === 'true') ? [
      pluginBasicSsl(),
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
