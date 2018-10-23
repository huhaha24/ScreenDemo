
const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const webpackConfigBase = require('./webpack.base.config')
const Copy = require('copy-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
function resolve(relatedPath) {
  return path.join(__dirname, relatedPath)
}

const webpackConfigProd = {
  plugins: [
    // 定义环境变量为开发环境
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      IS_DEVELOPMETN: false,
    }),
    //在生产模式下将第三方抽离出来
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../dist/manifest.json')
    }),
    new HtmlWebpackPlugin({
      template: resolve('../src/index.html'),
    }), 
    //将抽离出来的第三方和自己写的js文件同时加载到html文件中
    new AddAssetHtmlPlugin([{
      filepath: resolve('../dist/*.js'),
      includeSourcemap: false,
      hash: true,
    }]),
    // 提取css
    // 根据入口文件，提取重复引用的公共代码类库，打包到单独文件中
    // new webpack.optimize.OccurenceOrderPlugin(),
    /* 压缩优化代码开始*/
    new webpack.optimize.UglifyJsPlugin({ minimize: true }),
    // 分析代码
    //new BundleAnalyzerPlugin({ analyzerPort: 3011 }),
    //new Copy([
     // { from: './app/images', to: './images' },
    //]),
    //打包之前清除dist中的文件
    new cleanWebpackPlugin(['../dist/index.*.js', '../dist/style.*.css'])　 //匹配删除的文件
  ],
}
//将共有的配置文件和生产时使用的配置文件结合
module.exports = merge(webpackConfigBase, webpackConfigProd)
