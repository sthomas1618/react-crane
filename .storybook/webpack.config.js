const path = require('path')

module.exports = {
  module: {
    rules: [
      {
        test: /\index\.js?$/,
        include: [path.resolve(__dirname, '../stories')],
        loaders: [require.resolve('@storybook/addon-storysource/loader')],
        enforce: 'pre',
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  }
}
