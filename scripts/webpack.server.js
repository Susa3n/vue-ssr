// 服务端打包入口，打包出来的html字符串
const path = require('path')
const {merge} = require('webpack-merge')
const base = require('./webpack.base')
const htmlWebpackPlugin = require('html-webpack-plugin')
module.exports = merge(base,{
  target: "node", // 让谁使用
  entry: {
    server: path.resolve(__dirname,'../src/server-entry.js')
  },
  output: {
    libraryTarget: "commonjs2" // 导出供服务端渲染来使用
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.resolve(__dirname,'../public/index.ssr.html'),
      filename: 'server.html',
      excludeChunks:['server'], // 只需要打包后的内容，不需要js 排除模块server
      minify: false, // 禁止压缩
      clientSrc: '/client.bundle.js'
    }),
  ]
})