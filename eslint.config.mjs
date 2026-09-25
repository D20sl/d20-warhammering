// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt([
  {
    files: ['**/*.ts', '**/*.vue'],
    rules: {
      'vue/require-default-prop': 'off',
      '@typescript-eslint/prefer-literal-enum-member': 'off',

      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
]);
