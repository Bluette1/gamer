const webpack = require('webpack');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const path = require('path');
const DotEnv = require('dotenv-webpack');
require('dotenv').config();

module.exports = {

  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/build/',
    filename: 'project.bundle.js',
  },

  module: {
    rules: [{
      test: [/\.vert$/, /\.frag$/],
      use: 'raw-loader',
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: ['babel-loader'],
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    },
    {
      test: /\.(scss)$/,
      exclude: /node_modules/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    },
    {
      test: /\.(png|jpg|svg|gif|jpeg)?$/,
      use: 'file-loader',
    },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      CANVAS_RENDERER: JSON.stringify(true),
      WEBGL_RENDERER: JSON.stringify(true),
    }),
    new DotEnv({
      path: path.join(__dirname, '.env'),
      systemvars: true,
    }),
  ],
};