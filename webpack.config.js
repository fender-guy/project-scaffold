const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const path = require('path');
const isProduction = process.env.NODE_ENV === "production";

config = {
  context: __dirname + '/src',
  entry:  {
    app: './app.js',
    vendor: 'react'
  },
  output: {
    path: isProduction ? __dirname + '/dist' : __dirname + '/dev',
    filename: "[name].js",
    sourceMapFilename: "[file].map"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: path.resolve(__dirname + '/src'),
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                importLoaders: 1
              }
            },
            {
              loader: 'postcss-loader',
            }
          ]
        })
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        include: path.resolve(__dirname + '/src'),
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          fix: true
        }
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname + '/src'),
        exclude: /node_modules/,
        loader: 'babel-loader?cacheDirectory=true,presets[]=es2015,presets[]=react,presets[]=stage-2',
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        use: 'url-loader?limit=100000'
      }

    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        // this assumes your vendor imports exist in the node_modules directory
        return module.context && module.context.indexOf('node_modules') !== -1;
      }    
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': process.env.NODE_ENV
    })
  ],
  devtool: isProduction ? '' : 'eval-source-map',
  devServer: {
    contentBase: __dirname + '/dev',
  }
};

module.exports = config;
