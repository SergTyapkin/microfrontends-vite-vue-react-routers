import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginTseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import pluginCompat from 'eslint-plugin-compat';
import pluginNoLoops from 'eslint-plugin-no-loops';
import pluginSonarjs from 'eslint-plugin-sonarjs';
import pluginNoUseExtendNative from 'eslint-plugin-no-use-extend-native';
import pluginOptimizeRegex from 'eslint-plugin-optimize-regex';
import pluginPromise from 'eslint-plugin-promise';

/** @type {import('eslint').Linter.Config[]} */
export default [
  // Plugins setup
  pluginJs.configs['recommended'],
  ...pluginTseslint.configs['recommended'],
  ...pluginVue.configs['flat/strongly-recommended'],
  pluginCompat.configs['flat/recommended'],
  pluginNoUseExtendNative.configs['recommended'],
  pluginPromise.configs['flat/recommended'],
  {
    plugins: {
      'optimize-regex': pluginOptimizeRegex,
      sonarjs: pluginSonarjs,
      'no-loops': pluginNoLoops,
    },
  },

  {
    name: 'Global ignores',
    ignores: ['dist/'],
  },

  // Custom setup
  {
    name: 'All es6 code files',
    files: ['src/**/*.{js,mjs,cjs,ts,mts,jsx,tsx,vue}'],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        parser: pluginTseslint.parser,
        ecmaVersion: 2020,
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    name: 'Node.js builders files',
    files: ['vite.config.{js,ts,mjs,mts}', 'jsdoc.config.{js,ts,mjs,mts}'],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    name: 'Vue files',
    files: ['src/**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/no-mutating-props': 'off',
      // 'vue/v-for-delimiter-style': ['error', 'of'],
      'vue/next-tick-style': ['error', 'promise'],
      'vue/require-prop-types': 'error',
      'vue/prop-name-casing': ['error', 'camelCase'],
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/component-definition-name-casing': ['error', 'PascalCase'],
      'vue/custom-event-name-casing': ['error', 'camelCase'],
      'vue/no-duplicate-attr-inheritance': 'error',
      'vue/this-in-template': ['error', 'never'],
      'vue/v-on-style': ['error', 'shorthand'],
      'vue/no-multi-spaces': 'error',
      'vue/html-indent': 'error',
      'vue/padding-line-between-blocks': 'error',
      'vue/component-tags-order': [
        'error',
        {
          order: ['style', 'template', 'script'],
        },
      ],
      "vue/max-attributes-per-line": ["error", {
        "singleline": {
          "max": Infinity
        },
        "multiline": {
          "max": 1
        }
      }],
      'vue/singleline-html-element-content-newline': 'off',
      'vue/v-on-event-hyphenation': ['error', 'always'],
      'vue/attribute-hyphenation': ['error', 'always'],
      'vue/v-bind-style': 'error',
      'vue/v-slot-style': ['error', 'shorthand'],
      'vue/no-unused-properties': [
        'error',
        {
          groups: ['props', 'data', 'computed', 'setup'], // 'methods'
          ignorePublicMembers: true,
        },
      ],
      'max-len': [
        'warn',
        120,
        2,
        {
          ignoreComments: true,
          ignoreRegExpLiterals: true,
          ignoreStrings: false,
          ignoreTemplateLiterals: false,
        },
      ],
      'vue/order-in-components': [
        'error',
        {
          order: [
            'name',
            'directives',
            'components',
            'mixins',
            ['provide', 'inject'],
            'model',
            'props',
            'filters',
            'data',
            'computed',
            'LIFECYCLE_HOOKS',
            'ROUTER_GUARDS',
            'methods',
            'watch',
          ],
        },
      ],
    },
  },
];
