// 客户端打包入口，打包出来的js功能
const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const {merge} = require('webpack-merge')
const base = require('./webpack.base')
module.exports = merge(base,{
  entry: {
    client: path.resolve(__dirname,'../src/clinet-entry.js')
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.resolve(__dirname,'../public/index.html'),
      filename: 'client.html'
    }),
  ]
})