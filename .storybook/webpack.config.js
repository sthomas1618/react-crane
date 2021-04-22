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
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader'
          }
        ]
      }
    ]
  }
}
