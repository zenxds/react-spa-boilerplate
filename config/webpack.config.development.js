const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const ESLintPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const {
  getLocalIdent,
} = require('@dr.pogodin/babel-plugin-react-css-modules/utils')

// https://ant-design.gitee.io/docs/react/migration-v5-cn
const { theme } = require('antd/lib')
const { convertLegacyToken } = require('@ant-design/compatible/lib')
const { defaultAlgorithm, defaultSeed } = theme
const mapToken = defaultAlgorithm(defaultSeed)
const v4Token = convertLegacyToken(mapToken)

const rules = require('./webpack.rules')
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '../build'),
    filename: 'main.js',
  },
  devtool: 'inline-source-map',
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.js', '.jsx'],
    alias: {
      '@constants': resolve('constants'),
      '@components': resolve('components'),
      '@decorators': resolve('decorators'),
      '@utils': resolve('utils'),
      '@stores': resolve('stores'),
      '@contexts': resolve('contexts'),
      '@services': resolve('services'),
      '@hooks': resolve('hooks'),
    },
  },
  module: {
    rules: rules.concat([
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                getLocalIdent,
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                config: path.join(__dirname, 'postcss.config.js'),
              },
            },
          },
        ],
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                getLocalIdent,
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                config: path.join(__dirname, 'postcss.config.js'),
              },
            },
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                modifyVars: v4Token,
                relativeUrls: false,
                math: 'always',
                javascriptEnabled: true,
              },
            },
          },
        ],
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
    proxy: {
      '/dev': {
        target: '',
        pathRewrite: { '^/dev': '' },
      },
    },

    onBeforeSetupMiddleware: function (devServer) {
      devServer.app.use(function (req, res, next) {
        const file = path.join(__dirname, '..', req.path + '.json')

        if (fs.existsSync(file)) {
          res.json(JSON.parse(fs.readFileSync(file, 'utf-8')))
        } else {
          next()
        }
      })
    },
  },
}

function resolve(p) {
  return path.join(__dirname, '../src', p)
}
