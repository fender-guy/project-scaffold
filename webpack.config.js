const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const bourbon = require('node-bourbon').includePaths;
const neat = require('node-neat').includePaths;
const path = require('path');
const isProduction = process.env.NODE_ENV === "production";

config = {
  context: __dirname + '/src',
  entry:  {
    app: './app.js'
  },
  output: {
    path: __dirname + '/dev',
    filename: "bundle.js",
    sourceMapFilename: "[file].map"
  },
  module: {
    rules: [
      { 
        test: /\.scss$/,
        include: path.resolve(__dirname + '/src'),
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
              includePaths : ['./src/globalStyles', bourbon[0], neat[0]]
            }
          }
        ]
      },
      { 
        test: /\.css$/,
        include: path.resolve(__dirname + '/src'),
        use: ExtractTextPlugin.extract({ 
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname + '/src'),
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
  plugins: [ 
    new ExtractTextPlugin('[name].css')
  ],
  devtool: 'eval-source-map',
  devServer: {
    contentBase: __dirname + '/dev',
  }
};

if (isProduction) {
  config.output = {
    path: __dirname + '/dist',
    filename: "bundle.js"
  };
  config.devtool = ""; 
}

module.exports = config;
