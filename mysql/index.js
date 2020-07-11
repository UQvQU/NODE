const mysql = require('mysql')

let option = {
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '123456',
  database: 'thx'
}
// 创建数据库连接对象
let connection = mysql.createConnection(option)

// 建立连接
connection.connect(err => {
  // 连接失败
  if(err) {
    console.log('连接失败', err)
  } else {
    console.log('连接成功')
  }
})

// 执行数据库语句
// let sql = 'select * from student'
// connection.query(sql, (err, results, fields) => {
//   console.log('err: ', err)
//   console.log('result: ', results)
//   console.log('field: ', fields)
// })

// 删除表
// let sql2 = 'drop table user'
// connection.query(sql2, (err, results) => {
//   console.log(err)
//   console.log(results)
// })

// 删除库
// let sql3 = 'drop database db'
// connection.query(sql3, (err, results) => {
//   if (err) {
//     console.log(err)
//   } else{
//     console.log(results)
//   }
// })

// 创建数据库
// let sql4 = 'create database db'
// console.query(sql4, (err, results) => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(results)
//   }
// })

// 创建表
let sql5 = 'CREATE TABLE `NewTable` ( `id`  int NOT NULL AUTO_INCREMENT , `name`  varchar(255) NULL ,  `password`  varchar(255) NULL ,  `Email`  varchar(255) NULL , PRIMARY KEY (`id`));'
connection.query(sql5, (err, results) => {
  if (err) {
    console.log('err:', err)
  } else {
    console.log('results', results)
  }
})
