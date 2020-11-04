let MongoClient = require('mongodb').MongoClient
// url：协议+主机地址+端口号
let url = 'mongodb://localhost:27017/'

// 连接数据库
// 参数：url 配置 回调函数
// 由于新版本的MongoDB使用了新的url解析器和引擎，故需要配置useNewUrlParser和useUnifiedTopology
// MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, (err, db) => {
//   if (err) throw err;
//   // 数据库THX
//   let dbo = db.db('THX')
//   let myObj = { name: 'thx', type: 'beautiful', age: 20, hobby: ['eat', 'drink', 'play', 'happy']}
//   // 将文档myObj插入user集合中
//   dbo.collection('user').insertOne(myObj, (err, res) => {
//     if (err) throw err;
//     console.log('文档插入成功')
//     // 关闭数据库连接
//     db.close()
//   })
// })

// 插入多条数据
// !!! 若插入时无该数据库或集合，则会默认创建
// MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, (err, db) => {
//   if (err) throw err;
//   let dbo = db.db('THX')
//   let users = [
//     // {name: 'bob', type: 'handsome', hobby: ['play game']},
//     { name: 'thx', type: 'beautiful', age: 20, hobby: ['eat', 'drink', 'play', 'happy']},
//     {name: 'yue', type: 'beautiful', hobby: ['eat', 'drink', 'play', 'happy']},
//     {name: 'juan', type: 'beautiful', hobby: ['study']}
//   ]
//   dbo.collection('user').insertMany(users, (err, res) => {
//     if (err) throw err;
//     console.log('批量插入文档成功')
//     db.close()
//   })
// })

// 查询所有文档
// MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, (err, db) => {
//   if (err) throw err;
//   let dbo = db.db('THX')
//   dbo.collection('user').find().toArray((err, res) => {
//     // 返回集合中所有的语句
//     if (err) throw err;
//     console.log('查询成功-----',res.length)
//     db.close()
//   })
// })
// 查询type=beautiful并且hobby包括eat和happy的文档
// MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, (err, db) => {
//   if (err) throw err;
//   let dbo = db.db('THX')
//   // where type=beautiful && hobby包括eat和happy
//   let whereStr = {'type': 'beautiful', 'hobby': {$all: ['eat', 'happy']}}
//   dbo.collection('user').find(whereStr).toArray((err, res) => {
//     // 返回集合中所有的语句
//     if (err) throw err;
//     console.log('查询成功-----',res.length)
//     db.close()
//   })
// })


// 更新数据库
// update hobby push eat where type=handsome
// 如果符合条件的有多个文档，updateOne只更新第一个符合条件的文档
// MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, (err, db) => {
//   if (err) throw err;
//   let dbo = db.db('THX')
//   let whereStr = {'type': 'handsome'}
//   let updateStr = {$push: {'hobby': 'eat'}}
//   dbo.collection('user').updateOne(whereStr, updateStr, (err, res) => {
//     if (err) throw err;
//     console.log('更新成功')
//     db.close()
//   })
// })

// 更新多个文档 updateMany
// update hobby增加sleep和movie where hobby 包含eat
// MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, (err, db) => {
//   if (err) throw err;
//   let dbo = db.db('THX')
//   let whereStr = {'hobby': {$all: ['eat']}}
//   let updateStr = {$push: {'hobby': {$each: ['sleep', 'movie']}}}
//   dbo.collection('user').updateMany(whereStr, updateStr, (err, res) => {
//     if (err) throw err;
//     console.log('更新成功', res.result)
//     db.close()
//   })
// })

// 排序查询
// 按年龄正序排序查询所有文档，在忽略第一个文档的基础上显示前三个文档
// MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, (err, db) => {
//   if (err) throw err;
//   let dbo = db.db('THX')
//   // 正序
//   let mySort = { age: 1}
//   dbo.collection('user').find().sort(mySort).skip(1).limit(3).toArray((err, result) => {
//     if (err) throw err;
//     console.log(result)
//     db.close()
//   })
// })



// 删除文档
// deleteOne where name=juan
// MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, (err, db) => {
//   if (err) throw err;
//   let dbo = db.db('THX')
//   let whereStr = {'name': 'juan'}
//   dbo.collection('user').deleteOne(whereStr, (err, res) => {
//     if (err) throw err;
//     console.log('删除完毕', res.result)
//     db.close()
//   })
// })

// deleteMany where hobby包含eat和drink
// MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, (err, db) => {
//   if (err) throw err;
//   let dbo = db.db('THX')
//   let whereStr = {'hobby': {$all: ['eat', 'drink']}}
//   dbo.collection('user').deleteMany(whereStr, (err, res) => {
//     if (err) throw err;
//     console.log('删除完毕', res.result)
//     db.close()
//   })
// })



// MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, (err, db) => {
//   let dbo = db.db('THX')
//   let whereStr = {}
//   let stu_lesson = [
//     {_id: 1, name: 'thx', lesson_id: 128},
//     {_id: 2, name: 'bob', lesson_id: 127},
//     {_id: 3, name: 'yue', lesson_id: 119},
//     {_id: 4, name: 'juan', lesson_id: 124}
//   ]
//   dbo.collection('stu_lesson').insertMany(stu_lesson, (err, res) => {
//     if (err) throw err;
//     console.log('插入文档成功', res.result)
//     db.close()
//   })
// })

// MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, (err, db) => {
//   let dbo = db.db('THX')
//   let whereStr = {}
//   let lesson = [
//     {lessonName: 'Vue', _id: 128},
//     {lessonName: 'Java', _id: 127},
//     {lessonName: '数据挖掘', _id: 119},
//     {lessonName: '深度学习', _id: 124}
//   ]
//   dbo.collection('lesson').insertMany(lesson, (err, res) => {
//     if (err) throw err;
//     console.log('插入文档成功', res.result)
//     db.close()
//   })
// })

// 连表查询
MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, (err, db) => {
  if (err) throw err;
  let dbo = db.db('THX')
  dbo.collection('stu_lesson').aggregate([   // aggregate 聚合
    { $lookup:   // 连表方式
      {
        from: 'lesson',
        localField: 'lesson_id',
        foreignField: '_id',
        as: 'lessonDetails'
      }
    }
  ]).toArray((err, res) => {
    if (err) throw err;
    console.log('连表查询', JSON.stringify(res))
    db.close()
  })
})