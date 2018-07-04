const path = require('path');

module.exports = {
  entry: ['./assets/index.jsx'],
  output: {
    // TODO: generate unique-hash name and allow browsers to cache the resulting js bundle
    // https://webpack.js.org/guides/caching/ https://github.com/koajs/static-cache
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  resolve: { extensions: ['.js', '.jsx'] },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
