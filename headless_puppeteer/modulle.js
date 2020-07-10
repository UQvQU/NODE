let fs = require('fs')

let fsRead = path => new Promise((resolve, reject) => {
  fs.readFile(path, {flag: 'r', encoding: 'utf-8'}, (err, data) => {
    // console.log('thx', data)
    if (err) {
      // 失败
      // console.log('err', err)
      reject(err)
    } else {
      // 成功
      // console.log('data', data)
      resolve(data)
    }
  })
})

let fsWrite = (path, content) => new Promise((resolve, reject) => {
  fs.writeFile(path, content, {flag: 'a', encoding: 'utf-8'}, (error) => {
    if (error) {
      console.log('写入错误')
      reject(error)
    } else {
      console.log('写入成功')
      resolve('success')
    }
  })
})

module.exports = {
  fsRead,
  fsWrite
}