const {
  generateScopedNameFactory,
} = require('@dr.pogodin/babel-plugin-react-css-modules/utils')

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['> 1%', 'last 2 versions'],
        },
        modules: false,
      },
    ],
    '@babel/preset-react',
  ],
  env: {
    development: {
      plugins: [
        // ['@babel/plugin-proposal-decorators', { legacy: true }],
        // ['@babel/plugin-proposal-class-properties'],
        'react-refresh/babel',
        [
          '@dr.pogodin/react-css-modules',
          {
            webpackHotModuleReloading: true,
            handleMissingStyleName: 'warn',
            generateScopedName: generateScopedNameFactory(
              '[path]__[name]__[local]__[hash:base64:6]',
            ),
            filetypes: {
              '.less': {
                syntax: 'postcss-less',
              },
            },
          },
        ],
      ],
    },
    production: {
      plugins: [
        // ['@babel/plugin-proposal-decorators', { legacy: true }],
        // ['@babel/plugin-proposal-class-properties'],
        [
          '@dr.pogodin/react-css-modules',
          {
            generateScopedName: generateScopedNameFactory('[hash:base64]'),
            filetypes: {
              '.less': {
                syntax: 'postcss-less',
              },
            },
          },
        ],
      ],
    },
  },
}
