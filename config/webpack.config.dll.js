const path = require('path')
const moment = require('moment')
const webpack = require('webpack')
const dependencies = require('../package.json').dependencies

module.exports = {
  entry: {
    vendor: Object.keys(dependencies)
  },
  output: {
    path: path.join(__dirname, '../build'),
    filename: '[name].js'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '../tmp', 'manifest.json'),
      name: '[name]'
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.BannerPlugin(`${moment().format('YYYY-MM-DD HH:mm:ss')}`)
  ]
}