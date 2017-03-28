const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const bourbon = require('node-bourbon').includePaths;
const neat = require('node-neat').includePaths;
const path = require('path');

module.exports = {
  entry:  path.resolve(__dirname + '/dev/app.js'),
  output: {
    path: __dirname,
    filename: "./prod/bundle.js",
    sourceMapFilename: "[file].map"
  },
  module: {
    rules: [
      { 
        test: /\.scss$/,
        include: path.resolve(__dirname + '/dev'),
        use: [
          'style-loader',
          {
            loader : 'css-loader',
            options : { 
              sourceMap : true
            }
          },
          {
            loader : 'sass-loader',
            options : { 
              sourceMap : true,
              includePaths : ['./dev/globalStyles', bourbon[0], neat[0]]
            }
          }
        ]
      },
      { 
        test: /\.css$/,
        include: path.resolve(__dirname + '/dev'),
        use: ExtractTextPlugin.extract({ 
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname + '/dev'),
        exclude: /node_modules/,
        loader: [
          'babel-loader?cacheDirectory=true,presets[]=es2015,presets[]=react,presets[]=stage-2',
          'eslint-loader'
        ]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        use: 'url-loader?limit=100000'
      }

    ]
  },
  devtool: 'source-maps',
  plugins: [ 
    new ExtractTextPlugin(path.resolve('/prod/[name].css'))
  ]
};
