const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackConfigBase = require('./webpack.base.config')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

const PORT = 8888
function resolve(relatedPath) {
  return path.join(__dirname, relatedPath)
}
const webpackConfigDev = {
  plugins: [
    // 定义环境变量为开发环境
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      IS_DEVELOPMETN: true,
    }),
    // 将打包后的资源注入到html文件内，在开发模式下这个js问价是包含第三方的    
    new HtmlWebpackPlugin({
      template: resolve('../src/index.html'),
    }), 
    new OpenBrowserPlugin({
      url: `http://localhost:${PORT}/`,
    }),
  ],
  devtool: 'source-map',
  devServer: {
    historyApiFallback: false,
    hot: false,
    host: '0.0.0.0',
    port: PORT,
  },
}

module.exports = merge(webpackConfigBase, webpackConfigDev)
