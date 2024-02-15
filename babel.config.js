const {
  generateScopedNameFactory,
} = require('@dr.pogodin/babel-plugin-react-css-modules/utils')

module.exports = {
  presets: [
    // [
    //   '@babel/preset-env',
    //   {
    //     targets: {
    //       browsers: ['> 1%', 'last 2 versions'],
    //     },
    //     modules: false,
    //   },
    // ],
    // '@babel/preset-react',
  ],
  // assumptions: {
  //   setPublicClassFields: false,
  // },
  env: {
    development: {
      plugins: [
        // ['@babel/plugin-proposal-decorators', { legacy: true }],
        // ['@babel/plugin-proposal-class-properties'],
        // 'react-refresh/babel',
        [
          '@dr.pogodin/react-css-modules',
          {
            webpackHotModuleReloading: true,
            handleMissingStyleName: 'warn',
            generateScopedName: generateScopedNameFactory(
              '[path][name]__[local]--[hash:base64:5]',
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
