import data from './data.json'
function fn1(data) {
  console.log('fn1: ', data)
}
fn1(data)

/**
 * 开发环境打包命令： webpack 入口文件 -o  输出目录  --mode=development（模式）
webpack ./src/index.js -o ./dist/development --mode=development
生产环境打包：
webpack ./src/index.js -o ./dist/production --mode=production

webpack默认可以压缩js文件和json文件
生成环境打包比开发环境打包多了压缩代码和代码混淆的步骤
 */