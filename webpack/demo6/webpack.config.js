let path = require('path')
// console.log(path.resolve(__dirname, 'dist'))
// 安装html-webpack-plugin插件
let HtmlWebpackPlugin = require('html-webpack-plugin')

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
      },
      {
        // 图片文件处理
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        // 图片小于8k，base64处理，可以减少请求数量，但会使体积更大
        options: {
          // limit: 8*1024,
          // url-loader的es6模块化解析关闭, 因为与index.html冲突
          // esModule: false,
          // [hash:10]取图片hash的前10位
          // [ext]取图片扩展名
          name: '[hash:10].[ext]'
        }
      },
      // {  // 处理html
      //   test: /.\html$/,
      //   loader: 'html-loader'
      // }
    ]
  },
  // plugins插件配置
  plugins: [
    // index.html放入源代码中 当做template
    // html-webpack-plugin在打包目录中生成新的index.html,并自动引入js文件
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  // 热更新: 更改代码后，自动编译打包，可以实时查看效果
  // 安装webpack-dev-server 与webpack可能存在版本兼容问题
  devServer: {
    // 项目构建路径
    contentBase: path.resolve(__dirname, 'dist'),
    // 启动gzip压缩
    compress: true,
    // 端口号
    port: 3000,
    // 自动打开浏览器
    open: true
  }
}

/**
 * 安装loader
 * npm i style-loader css-loader --save-dev
 * 安装loader
 * npm i html-webpack-plugin --save-dev
 * 
 * npm link webpack --save-dev
 * E:\fontEnd\NODE\webpack\demo4_plugin\node_modules\webpack -> 
 * C:\Users\lenovo\AppData\Roaming\npm\node_modules\webpack
 * 
 * 热更新
 * cnpm i webpack-dev-server -g
 * 
 * webpack 3.x版本和webpack-dev-server 3.x版本不兼容
 * 运行命令：（全局安装webpack-dev-server）
 * webpack-dev-server
 * 
 * emmm 运行失败，兼容失败
 * webpack-dev-server@2.9.7
 * webpack-cli 4.2.0
 * webpack 5.4.0
 */

//  不推荐全局安装 webpack。这会将你项目中的 webpack 锁定到指定版本，
// 并且在使用不同的 webpack 版本的项目中，可能会导致构建失败。
// 