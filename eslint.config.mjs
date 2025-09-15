import pluginJs from '@eslint/js';
import eslintPlugin from 'eslint-plugin-eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';
import pluginCypress from 'eslint-plugin-cypress';
import prettierConfig from './prettier.config.mjs';

export default [
  pluginJs.configs.recommended,
  eslintPlugin.configs.recommended,
  pluginCypress.configs.recommended,
  {
    languageOptions: {
      globals: {
        require: 'readonly',
        module: 'readonly',
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': ['error', prettierConfig],
    },
  },
];
