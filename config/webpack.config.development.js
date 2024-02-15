const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const ESLintPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const {
  getLocalIdent,
} = require('@dr.pogodin/babel-plugin-react-css-modules/utils')

const rules = require('./webpack.rules')

function getCSSLoaders(modules = false) {
  return [
    'style-loader',
    {
      loader: 'css-loader',
      options: modules
        ? {
            modules: {
              getLocalIdent,
              localIdentName: '[path]__[name]__[local]__[hash:base64:6]',
            },
          }
        : {},
    },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          config: path.join(__dirname, 'postcss.config.js'),
        },
      },
    },
  ]
}

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, '../build'),
    filename: 'main.js',
  },
  devtool: 'inline-source-map',
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    extensionAlias: {
      '.js': ['.js', '.ts'],
      '.cjs': ['.cjs', '.cts'],
      '.mjs': ['.mjs', '.mts'],
    },
    alias: {
      '@/constants': resolve('constants'),
      '@/components': resolve('components'),
      '@/hooks': resolve('hooks'),
      '@/utils': resolve('utils'),
      '@/stores': resolve('stores'),
      '@/contexts': resolve('contexts'),
      '@/services': resolve('services'),
    },
  },
  module: {
    rules: rules.concat([
      {
        test: /\.([cm]?ts|tsx)$/,
        use: ['babel-loader', 'ts-loader'],
      },
      {
        test: /\.css$/,
        use: getCSSLoaders(),
      },
      {
        test: /\.less$/,
        exclude: /global\.less$/,
        use: getCSSLoaders(true).concat([
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                math: 'always',
                javascriptEnabled: true,
              },
            },
          },
        ]),
      },
      {
        test: /global\.less$/,
        use: getCSSLoaders().concat([
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                math: 'always',
                javascriptEnabled: true,
              },
            },
          },
        ]),
      },
    ]),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: fs.existsSync(
        path.join(__dirname, '../template/index.dev.html'),
      )
        ? 'template/index.dev.html'
        : 'template/index.html',
    }),
    new ESLintPlugin({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      failOnError: true,
    }),
    new ReactRefreshWebpackPlugin(),
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    new webpack.DefinePlugin({
      API_SERVER_PLACEHOLDER: JSON.stringify(''),
    }),
  ],
  devServer: {
    static: [
      {
        directory: path.join(__dirname, '../data'),
      },
      {
        directory: path.join(__dirname, '../build'),
      },
    ],
    client: {
      webSocketURL: 'ws://0.0.0.0:8085/ws',
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    port: 8085,
    hot: true,
    historyApiFallback: true,
    host: '0.0.0.0',
    allowedHosts: 'all',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    // proxy: {
    //   '/dev': {
    //     target: '',
    //     pathRewrite: { '^/dev': '' },
    //   },
    // },

    setupMiddlewares: function (middlewares, devServer) {
      devServer.app.use(function (req, res, next) {
        const file = path.join(__dirname, '..', req.path + '.json')

        if (fs.existsSync(file)) {
          res.json(JSON.parse(fs.readFileSync(file, 'utf-8')))
        } else {
          next()
        }
      })

      return middlewares
    },
  },
}

function resolve(p) {
  return path.join(__dirname, '../src', p)
}
