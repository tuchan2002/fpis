module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true
    },
    extends: 'airbnb-base',
    overrides: [
        {
            env: {
                node: true
            },
            files: [
                '.eslintrc.{js,cjs}'
            ],
            parserOptions: {
                sourceType: 'script'
            }
        }
    ],
    parserOptions: {
        ecmaVersion: 'latest'
    },
    rules: {
        quotes: ['error', 'single', { allowTemplateLiterals: true }],
        indent: ['error', 4],
        'arrow-parens': 'warn',
        'comma-dangle': ['error', {functions: 'ignore'}],
        'consistent-return': 'off',
        'function-paren-newline': 'off',
        'max-len': 'off',
        'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
        'no-return-assign': 'off',
        'no-use-before-define': ['error', { functions: false }],
        'object-curly-spacing': 'off',
        'prefer-const': 'warn',
        'no-underscore-dangle': 'off',
        'prefer-destructuring': 'off',
        camelcase: 'off'
    }
};
