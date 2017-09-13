var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
 // devtool: 'cheap-module-eval-source-map',
    devtool: 'source-map',
  output: {
    path: helpers.root('dist'),
    publicPath: '/',
    filename: 'platform/[name].[hash].js',
    chunkFilename: 'platform/[name].[hash].chunk.js'
  },

  plugins: [
      new webpack.optimize.UglifyJsPlugin({
          compress: {
              warnings: false
          },
          sourceMap: true,//这里的soucemap 不能少，可以在线上生成soucemap文件，便于调试
          mangle: true
      }),

    // new webpack.DefinePlugin({
    //   'process.env': {
    //     'ENV': JSON.stringify(ENV)
    //   }
    // })
      new webpack.DefinePlugin({
          'process.env': {
              NODE_ENV: '"production"'
          }
      })
  ]
});