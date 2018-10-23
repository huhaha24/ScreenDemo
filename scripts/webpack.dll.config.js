const webpack = require('webpack')
const path = require('path')

function resolve(relatedPath) {
  return path.join(__dirname, relatedPath)
}

module.exports = {
  entry: {
    vendors: ['react', 'd3', 'antd', 'react-dom', 'react-redux','react-router']
  },

  output: {
    filename: '[name].dll.js',//文件名的格式
    path: resolve('../dist'),//输出文件存放的路径
    library: '[name]_[chunkhash:4]'//定义manifest的格式
  },

  plugins: [
    new webpack.DllPlugin({
      path: resolve('../dist/manifest.json'),
      // 要和上面的library一致
      name: '[name]_[chunkhash:4]',
      context: __dirname 
    }),
  ],
}


