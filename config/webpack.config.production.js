// https://www.maizhiying.me/posts/2017/03/01/webpack-babel-ie8-support.html
const path = require('path')
const dayjs = require('dayjs')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CSSMinimizerPlugin = require('css-minimizer-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const {
  getLocalIdent,
} = require('@dr.pogodin/babel-plugin-react-css-modules/utils')

const rules = require('./webpack.rules')

function getCSSLoaders(modules = false) {
  return [
    MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: modules
        ? {
            modules: {
              getLocalIdent,
              localIdentName: '[hash:base64]',
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
  mode: 'production',
  target: 'web',
  entry: './src/index.tsx',
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
      new CSSMinimizerPlugin(),
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
