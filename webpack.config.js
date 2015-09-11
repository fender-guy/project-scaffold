var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var bourbon = require('node-bourbon').includePaths;
var neat = require('node-neat').includePaths;
var path = require('path');

module.exports = {
    entry: {
        index: path.resolve(__dirname + '/dev/app.js')
    },
    output: {
        path: __dirname,
        filename: "./prod/bundle.js",
        sourceMapFilename: "[file].map"
    },
    module: {
        preLoaders: [
            {
                test: /\.jsx?$/,
                include: path.resolve(__dirname + '/dev'),
                loader: 'eslint-loader'
            }
        ],
        loaders: [
            { test: /\.scss$/, include: path.resolve(__dirname + '/dev'),
                loader:
                    'style-loader!css?sourceMap!' +
                    'sass?sourceMap&' +
                    "&includePaths[]=" + './dev/globalStyles' +
                    "&includePaths[]=" + bourbon[0] +
                    "&includePaths[]=" + neat[1]

            },
            { test: /\.css$/, include: path.resolve(__dirname + '/dev'), loader: "style-loader!css-loader" },
            { test: /\.js$/, include: path.resolve(__dirname + '/dev'), loader: 'babel-loader' },
            { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }

        ]
    },
    resolve: {
        alias: {
            'react': path.join(__dirname, 'node_modules/react/react.js'),
            'react-addons': path.join(__dirname, 'node_modules/react/addons.js'),
            'keyMirror' : path.join(__dirname, 'node_modules/keymirror/index.js'),
            'appHOC' : path.join(__dirname, 'dev/components/appHOC.js')
        },
        extensions: ['', '.js', '.jsx', '.json', '.css'],
        root: [
            path.resolve(__dirname + '/dev'),
            path.resolve(__dirname + '/dev/components')
        ]
    },
    plugins: [ 
        new ExtractTextPlugin(path.resolve(__dirname + '/prod/[name].css')),
        new webpack.PrefetchPlugin('react'),
        new webpack.ProvidePlugin({
            React : 'react',
            keyMirror : 'keyMirror',
            appHOC : 'appHOC'
        })
    ]
};
