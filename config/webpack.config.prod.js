// https://www.maizhiying.me/posts/2017/03/01/webpack-babel-ie8-support.html
const path = require('path')
const moment = require('moment')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const WebpackCleanupPlugin = require('webpack-cleanup-plugin')

const rules = require('./webpack.rules')
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '../build'),
    publicPath: '/',
    filename: 'main.js'
  },
  module: {
    rules: rules.concat([{
        test: /\.jsx?$/,
        loader: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract([
          {
            loader: 'css-loader',
            options: {
              minimize: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: 'config/postcss.config.js'
              }
            }
          }
        ])
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract([
          {
            loader: 'css-loader',
            options: {
              minimize: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: 'config/postcss.config.js'
              }
            }
          },
          {
            loader: 'less-loader',
            options: {
              relativeUrls: false
            }
          }
        ])
      }
    ])
  },
  plugins: [
    new WebpackCleanupPlugin({
      exclude: ['vendor.js']
    }),
    new webpack.DllReferencePlugin({
      manifest: require('../tmp/manifest.json')
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('prod')
    }),
    new ExtractTextPlugin({
      disable: false,
      allChunks: true,
      filename: '[name].css'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.BannerPlugin(`${moment().format('YYYY-MM-DD HH:mm:ss')}`)
  ]
}