module.exports = [
  {
    test: /\.(woff|woff2|eot|ttf|otf)$/,
    type: 'asset/resource',
    generator: {
      filename: 'assets/fonts/[contenthash][ext]',
    },
  },
  {
    test: /\.(png|jpe?g|gif|svg)$/,
    type: 'asset/resource',
    generator: {
      filename: 'assets/images/[contenthash][ext]',
    },
  }
]
