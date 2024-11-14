import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginTseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginReactRefresh from 'eslint-plugin-react-refresh';
import pluginReactHooks from 'eslint-plugin-react-hooks';
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
  pluginReact.configs.flat['jsx-runtime'],
  pluginCompat.configs['flat/recommended'],
  pluginNoUseExtendNative.configs['recommended'],
  pluginPromise.configs['flat/recommended'],
  {
    plugins: {
      'optimize-regex': pluginOptimizeRegex,
      sonarjs: pluginSonarjs,
      'no-loops': pluginNoLoops,
      'react-refresh': pluginReactRefresh,
      'react-hooks': pluginReactHooks,
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
    name: 'React settings',
    rules: {
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
  {
    name: 'Node.js builders files',
    files: ['vite.config.{js,ts,mjs,mts}', 'jsdoc.config.{js,ts,mjs,mts}'],
    languageOptions: {
      globals: globals.node,
    },
  },
];
