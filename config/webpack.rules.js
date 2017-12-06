module.exports = [
  {
    test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
    use: 'url-loader?limit=10000&name=font/[hash].[ext]'
  }
]
