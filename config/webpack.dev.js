var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
    devtool: 'cheap-module-source-map',
    watch: false,
    output: {
        path: helpers.root('dist'),
        publicPath: '/',
        filename: 'platform/[name].js',
        chunkFilename: 'platform/[name].chunk.js'
    },
    devServer: {
        contentBase: "./dist",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true,//实时刷新
    }
});