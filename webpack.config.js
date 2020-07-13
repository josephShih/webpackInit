const path = require('path');
const { NODE_ENV = 'production' } = process.env;
const nodeExternals = require('webpack-node-externals');
const WebpackShellPlugin = require('webpack-shell-plugin');

module.exports = {
  entry: __dirname + '/src/index.js',
  target: 'node',
  output: {
    path: __dirname + '/build',
    filename: 'main.js'
  },
  watch: NODE_ENV === 'development',
  mode: NODE_ENV,
  module: {
    rules: [
      {
        test: /\.(sql)$/,
        exclude: /node_modules/,
        loader: 'raw-loader'
      }
    ]
  },
  devServer: {
    contentBase: './build',
    historyApiFallback: true,
    inline: true
  },
  externals: [ nodeExternals() ],
  plugins: [
    new WebpackShellPlugin({onBuildEnd:['npm run run:dev']})
  ]
};
