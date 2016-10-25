/**
 * Created by pizzax on 06.09.2016.
 */
'use strict';
const webpack = require('webpack'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      path = require('path'),
      ExtractTextPlugin = require('extract-text-webpack-plugin'),
      BrowserSyncPlugin = require('browser-sync-webpack-plugin');
	  
let webpackConfig = {
    entry: __dirname + '/src/index.js',
    output: {
        path: __dirname + './../public',
        filename: "/js/[name].js",
        publicPath: ''
    },
    module: {
        loaders: [
            {test: /\.scss$/, loader:  ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')},
			{test: /\.css$/, loader:  ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')},
            {test: /\.gif$/, loader: 'url-loader?limit=10000&mimetype=image/gif'},
            {test: /\.jpg$/, loader: 'url-loader?limit=10000&mimetype=image/jpg'},
            {test: /\.png$/, loader: 'url-loader?limit=10000&mimetype=image/png'},
            {test: /\.jade$/, loader: 'jade-loader'},
            {test: /\.js$/, loader: 'babel', exclude: [/node_modules/]},
            {test: /\.json$/, loader: 'json-loader'},
            {test: /\.html$/, loader: 'raw'},
			{test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"},
			{test: /\.(woff|woff2)$/, loader: "url?prefix=font/&limit=5000"},
			{test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream"},
			{test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml"}
        ]
    },
    resolve: {
        extensions: ['', '.js', '.scss'],
        root: [path.join(__dirname, './src')]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            css: [ "main.css" ],
            template: 'index.html'
        }),
        new ExtractTextPlugin('/css/[name].css')
    ]
};

module.exports = webpackConfig;