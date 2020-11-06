let path = require('path')
console.log(path.resolve(__dirname, 'dist'))

module.exports = {
  // 入口文件
  entry: './src/index.js',
  output: {
    // 输出文件名称
    filename: 'bundle.js',
    // 输出的路径
    // 绝对路径
    path: path.resolve(__dirname, 'dist')
  },
  // 开发模式   production（生产模式）
  mode: 'development',
  // loader的配置
  module: {
    // 对css文件格式进行转换处理
    rules: [
      {
        test: /\.css$/,
        use: [ // use数组中loader的顺序是从下到上的，逆序进行
          // 2. 后将js的样式内容插入到style标签里
          'style-loader',
          // 1. 现将css文件转换为js
          'css-loader'
        ]
      }
    ]
  }
}

/**
 * 安装loader
 * npm i style-loader css-loader --save-dev
 * 
 * 使用webpack配置文件打包 (全局安装的webpack)
 * 打包命名：webpack
 */