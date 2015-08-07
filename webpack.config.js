var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var bourbon = require('node-bourbon').includePaths;
var neat = require('node-neat').includePaths;
var path = require('path');

module.exports = {
    entry: {
        index: "./dev/app.js"
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
                exclude: /node_modules/,
                loader: 'eslint-loader'
            }
        ],
        loaders: [
            { test: /\.less$/, exclude: /node_modules/, loader: "style-loader!css-loader!less-loader" },
            { test: /\.scss$/, exclude: /node_modules/,
                loader:
                    'style-loader!css?sourceMap!' +
                    'sass?sourceMap&' +
                    "&includePaths[]=" + './dev/globalStyles' +
                    "&includePaths[]=" + bourbon[0] +
                    "&includePaths[]=" + neat[1]

            },
            { test: /\.css$/, exclude: /node_modules/, loader: "style-loader!css-loader" },
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
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
        new ExtractTextPlugin('./prod/[name].css'),
        new webpack.PrefetchPlugin('react'),
        new webpack.ProvidePlugin({
            React : 'react',
            keyMirror : 'keyMirror',
            appHOC : 'appHOC'
        })
    ],
    jshint: {
        esnext: true
    }
};
