const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const PROD = process.env.NODE_ENV === 'production';

const distDir = 'public';
const srcDir = 'src';

module.exports = {
  entry: './' + srcDir + '/app.js',
  output: {
    path: path.resolve(__dirname, distDir),
    publicPath: '/',
    filename: 'app.js'
  },
  mode: PROD ? 'production' : 'development',
  stats: 'minimal',
  devtool: 'cheap-module-source-map',
  devServer: {
    contentBase: distDir,
    historyApiFallback: true,
    stats: 'minimal',
    // hot: true,
    proxy: {
      '/api': 'http://localhost:3000'
    }
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        use: ['file-loader']
      }, {
        test: /\.vue$/,
        use: ['babel-loader', 'vue-loader']
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }, {
        test: /\.css$/,
        use: ['css-loader']
      }, {
        test: /\.s[ac]ss$/,
        use: ['css-loader', 'sass-loader']
      }
    ]
  },
  resolve: {
    modules: [
      'node_modules'
    ],
    alias: {
      '@': path.resolve(__dirname, srcDir)
    }
  },
  plugins: (function() {
    let plugins = [
      new FriendlyErrorsWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: '<%= appName %>',
        xhtml: true,
        template: srcDir + '/index.html'
      }),
      new webpack.DefinePlugin({
        'typeof window': '"object"',
        'process.env.NODE_ENV': '"' + process.env.NODE_ENV + '"'
      })
    ];
    return plugins;
  })()
};
