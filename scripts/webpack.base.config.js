
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')


function resolve(relatedPath) {
  return path.join(__dirname, relatedPath)
}
const webpackConfigBase = {
  entry: {
    index: resolve('../src/index.js'),
  },
  output: {
    path: resolve('../dist'),
    filename: '[name].[hash:4].js',
    chunkFilename: 'chunks/[name].[hash:4].js',
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@config': resolve('../src/config'),
      '@style': path.join(__dirname, '../src/style'),
      '@version': path.join(__dirname, '../src/version'),
      '@utils': path.join(__dirname, '../src/utils'),
      '@components': path.join(__dirname, '../src/components')
    }
  },
  resolveLoader: {
    moduleExtensions: ['-loader']
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: [
            [  "import",{libraryName: "antd", style: 'css'}] // antd按需加载
          ]
        }
      },  
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style',
          use: [
            { loader: 'css', options: { sourceMap: true } },
            {
              loader: 'less', options: {
                sourceMap: true, 
                paths: [
                  path.resolve(__dirname, "../src"),
                  //path.resolve(__dirname, "../src/style")
                ]
              }
            }
          ]
        }),
      },
      {
        test: /\.css/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style',
          use: [
            { loader: 'css', options: { sourceMap: true } }
          ]
        }),
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        options: {
          limit: 8192,
          name: 'img/[name].[hash:4].[ext]'
        }
      },
      {
        test: /\.(woff|eot|ttf|svg|gif)$/,
        loader: 'url',
        options: {
          limit: 8192,
          name: 'font/[name].[hash:4].[ext]'
        }
      },
      {
        test: /\.html$/,  //静态资源
        loader: 'html',
    }
    ],
  },
  plugins: [
    // 提取css
    new ExtractTextPlugin('style.[hash:4].css')
    
  ]
}

module.exports = webpackConfigBase
