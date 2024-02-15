// https://www.maizhiying.me/posts/2017/03/01/webpack-babel-ie8-support.html
const path = require('path')
const dayjs = require('dayjs')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
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
  mode: 'production',
  target: 'web',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '../build'),
    filename: 'main.js',
    chunkFilename: '[name].[contenthash].js',
    clean: {
      keep: /vendor/,
    },
  },
  optimization: {
    // chunkIds: 'named',
    minimize: true,
    minimizer: [
      new webpack.BannerPlugin(`${dayjs().format('YYYY-MM-DD HH:mm:ss')}`),
      new TerserPlugin({
        parallel: true,
        extractComments: false,
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
      new CssMinimizerPlugin(),
    ],
  },
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
    fallback: require('./webpack.fallback'),
  },
  module: {
    rules: rules.concat([
      {
        test: /\.([cm]?ts|tsx)$/,
        use: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                getLocalIdent,
                localIdentName: '[hash:base64]',
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
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                getLocalIdent,
                localIdentName: '[hash:base64]',
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
    new webpack.DllReferencePlugin({
      manifest: require('../data/manifest.json'),
    }),
    new webpack.DefinePlugin({
      API_SERVER_PLACEHOLDER: JSON.stringify(''),
    }),
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, '../data'),
          globOptions: {
            ignore: ['**/manifest.json'],
          },
        },
      ],
    }),
    new webpack.optimize.MinChunkSizePlugin({
      // Minimum number of characters
      minChunkSize: 10000,
    }),
    new MiniCssExtractPlugin({
      chunkFilename: '[name].[contenthash].css',
      filename: '[name].css',
    }),
    new HtmlWebpackPlugin({
      template: 'template/index.prod.html',
      hash: true,
      random: Math.random().toString().slice(2),
    }),
  ],
}

function resolve(p) {
  return path.join(__dirname, '../src', p)
}
