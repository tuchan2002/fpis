module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true
    },
    extends: 'airbnb',
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
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    rules: {
        indent: ['error', 4],
        'arrow-parens': 'warn',
        'comma-dangle': ['error', {functions: 'ignore'}],
        'consistent-return': 'off',
        eqeqeq: 'off',
        'no-useless-catch': 'off',
        'function-paren-newline': 'off',
        'import/no-named-as-default': 'off',
        'import/no-named-as-default-member': 'off',
        'import/no-unresolved': 'off',
        'import/no-extraneous-dependencies': ['error', {devDependencies: true}],
        'jsx-a11y/alt-text': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/anchor-has-content': 'off',
        'jsx-a11y/anchor-is-valid': 'off',
        'jsx-a11y/mouse-events-have-key-events': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-quotes': ['warn', 'prefer-single'],
        'max-len': 'off',
        'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
        'no-return-assign': 'off',
        'no-use-before-define': ['error', { functions: false }],
        'object-curly-newline': ['error', {
            ObjectExpression: {consistent: true},
            ObjectPattern: {consistent: true},
            ImportDeclaration: {consistent: true},
            ExportDeclaration: {consistent: true}
        }],
        'object-curly-spacing': 'off',
        'prefer-const': 'warn',
        'react/jsx-boolean-value': 'warn',
        'react/jsx-filename-extension': ['error', { extensions: ['.js'] }],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'react/jsx-no-bind': ['warn', {ignoreRefs: true}],
        'react/no-array-index-key': 'warn',
        'jsx-a11y/label-has-for': 'off',
        'no-underscore-dangle': 'off',
        'react/react-in-jsx-scope': 'off',
        camelcase: 'off',
        'react/prop-types': 'off',
        'no-param-reassign': 'off',
        'prefer-destructuring': 'off'
    }
};
