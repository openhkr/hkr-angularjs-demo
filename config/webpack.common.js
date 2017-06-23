const webpack = require('webpack');
const path = require("path");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    entry: {
        bundle: "./app/start/boot",
        vendors:[
            './node_modules/zone.js/dist/zone',
            './node_modules/bootstrap/dist/js/bootstrap'
          //  './app/lego/amap/amap'

        ]
    },

    resolve: {
        extensions: ['.ts', '.js']
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                  loaders: ["babel-loader", "light-ts-loader","angular2-load-children-loader"],//"angular2-load-children-loader",'angular2-router-loader'
            },
            // {
            //     test: /\.html$/,
            //     loader: 'html-loader'
            // },
            // {
            //     test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
            //     loader: 'file?name=assets/[name].[hash].[ext]'
            // },
            // {
            //     test: /\.css$/,
            //     exclude: helpers.root('app', 'modules'),
            //     loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader'})
            // },
            // {
            //     test: /\.css$/,
            //     include: helpers.root('app', 'modules'),
            //     loader: 'raw'
            // }
        ],
        noParse: [
            /zone\.js\/dist/
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename:'platform/index.html',
            template: 'index.html'
        }),
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendors', filename: 'platform/vendors.js' })
    ]


};