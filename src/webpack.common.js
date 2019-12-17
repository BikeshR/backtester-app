const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')

const production = process.env.NODE_ENV === 'production'
const fileNameTemplate = (ext) => (production
  ? `[name].[chunkhash].min.${ext}`
  : `[name].${ext}`)

const SRC_DIR = __dirname
const CLIENT_BUILD_DIR = path.resolve(__dirname, '../dist/client')
const CLIENT_DIR = path.resolve(SRC_DIR, 'client')

module.exports = {
  mode: production ? 'production' : 'development',
  devtool: 'inline-source-map',
  devServer: { historyApiFallback: true },
  entry: [
    path.resolve(CLIENT_DIR, 'main.js'),
  ],
  output: {
    path: CLIENT_BUILD_DIR,
    filename: fileNameTemplate('js'),
    publicPath: '/',
  },
  resolve: { extensions: ['.js', '.jsx'] },
  plugins: [
    new webpack.EnvironmentPlugin({ NODE_ENV: 'development' }),
    new HtmlWebpackPlugin({
      template: path.resolve(CLIENT_DIR, 'index.html'),
      filename: 'index.html',
      inject: 'body',
    }),
    new ExtractTextPlugin(fileNameTemplate('css')),
    new webpack.ProvidePlugin({ Promise: ['es6-promise', 'Promise'] }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [SRC_DIR],
        loader: 'babel-loader',
        options: { envName: 'client' },
      },
      {
        test: /\.md$/,
        include: [SRC_DIR],
        loader: 'raw-loader',
      },
      {
        test: /\.(scss|css)?$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!sass-loader',
        }),
      },
      {
        test: /\.(ico|png|gif|ttf|otf|eot|svg|woff(2)?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=[name].[ext]',
        options: {
          name: (file) => (production && !file.endsWith('.ico')
            ? '[name].[hash].[ext]'
            : '[name].[ext]'),
        },
      },
    ],
  },
  node: { fs: 'empty' },
}
