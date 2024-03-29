const path = require('path')
const dayjs = require('dayjs')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')

const dependencies = require('../package.json').dependencies
const rules = require('./webpack.rules')

module.exports = {
  mode: 'production',
  target: 'web',
  entry: {
    vendor: Object.keys(dependencies),
  },
  output: {
    path: path.join(__dirname, '../data'),
    filename: '[name].js',
    library: '[name]',
  },
  resolve: {
    fallback: require('./webpack.fallback')
  },
  module: {
    rules,
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        extractComments: false,
      }),
    ],
  },
  plugins: [
    new webpack.BannerPlugin(`${dayjs().format('YYYY-MM-DD HH:mm:ss')}`),
    new webpack.DllPlugin({
      path: path.join(__dirname, '../data', 'manifest.json'),
      name: '[name]',
    }),
  ],
}
