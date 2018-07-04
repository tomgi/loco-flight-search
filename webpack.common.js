// allowing this dev-only webpack compilation code to access devDependencies
// following convention proposed in https://github.com/webpack/webpack/issues/520#issuecomment-174011824
/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');


module.exports = {
  entry: ['./assets/index.js'],
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
  module: {
    rules: [{
      test: /\.vue$/,
      use: {
        loader: 'vue-loader',
      },
    },
    {
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
      },
    },
    ],
  },
  plugins: [
    // make sure to include the plugin for the magic
    new VueLoaderPlugin(),
  ],
};
/* eslint-enable */
