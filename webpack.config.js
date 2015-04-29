var ExtractTextPlugin = require('extract-text-webpack-plugin');
var bourbon = require('node-bourbon').includePaths;
var neat = require('node-neat').includePaths;

module.exports = {
    entry: "./dev/app.js",
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
    plugins: [ new ExtractTextPlugin('./prod/[name].css') ],
    jshint: {
        esnext: true
    }
};
