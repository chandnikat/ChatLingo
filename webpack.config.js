const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',

  entry: {
    main: path.resolve(__dirname, './src/index.js'),
  },

  output: {
    // path: path.resolve(__dirname, './dist'),
    // filename: '[name].bundle.js',
    // publicPath: '/',
  },

  devServer: {
    proxy: {
      '*': 'http://[::1]:3000',
      // "secure": false,
      // "changeOrigin": true
    },
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, './dist'),
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },
  devtool: 'source-map',
  module: {
    rules: [
      // JavaScript
      {
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      // CSS, PostCSS, and Sass
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '',
            },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      // Images
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      // Fonts and SVGs
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html', // output file
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    // new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],

  resolve: {
    // Enable importing JS / JSX files without specifying their extension
    extensions: ['.js', '.jsx'],
  },
};
