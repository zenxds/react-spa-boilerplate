// https://www.maizhiying.me/posts/2017/03/01/webpack-babel-ie8-support.html
const path = require('path')
const moment = require('moment')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const dependencies = require('../package.json').dependencies

module.exports = {
  entry: {
    vendor: Object.keys(dependencies)
  },
  output: {
    path: path.join(__dirname, '../build'),
    publicPath: '/',
    filename: '[name].js'
  },
  module: {
    rules: [{
        test: /\.jsx?$/,
        loader: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)(\?[a-z0-9=\.]+)?$/,
        use: 'url-loader?limit=10000'
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: 'url-loader?limit=8192&name=image/[hash].[ext]'
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
    ]
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '../tmp', 'manifest.json'),
      name: '[name]'
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