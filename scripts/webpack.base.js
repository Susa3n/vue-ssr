// webpack配置文件 进行打包 webpack webpack-cli

// 在代码中使用高级语法需要转换成低级语法 
//  @babel/core babel的核心模块  遇到高级语法需要使用@babel/core进行编译
//  babel-loader webpack和babel的桥梁，本质上是一个函数，将webpack和babel进行关联
//  @babel/preset-env 核心功能把es6+语法转成低级语法
// vue-loader vue-template-compiler 解析.vue文件  并且编译模板 +++ 使用vue-loader时配合VueLoaderPlugin，在vue-loader安装时已经安装完毕，路径vue-loader/lib/plugin
// 解析css-loader  把.vue中的样式转成css
// vue-style-loader 将解析好的css并插入到style标签中 支持服务端渲染
const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const vueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
  mode: 'development',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname,'../dist')
  },
  module: {
    rules: [{
      test: /\.vue$/,
      use: 'vue-loader'
    },
    {
      test: /\.js$/,
      use: {
        loader: 'babel-loader', // babel-loader默认会找babel/core(而babel-core需要配一些预设@babel/preset-env)
        options: {
          presets: ['@babel/preset-env'] // 插件的集合  比如箭头函数 类的转换
        }
      },
      exclude: /node_modules/ // 表示node_modules 不需要编译
    },
    {
      test: /\.css$/,
      use: ['vue-style-loader','css-loader']
    }
    ]
  },
  plugins: [
    new vueLoaderPlugin()
  ]
}