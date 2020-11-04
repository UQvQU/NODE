let axios = require('axios')
let MongoClient = require('mongodb').MongoClient

let MongoUrl = 'mongodb://localhost:27017/'

// 封装insertManyPromise函数
let insertMany = function(collection, arr) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(MongoUrl, {useNewUrlParser: true, useUnifiedTopology: true}, (err, db) => {
      if (err) throw err;
      let dbo = db.db('THX')
      dbo.collection(collection).insertMany(arr, (err, res) => {
        if (err) reject(err);
        console.log('插入成功，数量：', res.insertedCount)
        db.close()
        resolve()
      })
    })
  })
}

// 封装insertOnePromise函数
let insertOne = (collection, obj) => new Promise((resolve, reject) => {
  MongoClient.connect(MongoUrl, {useNewUrlParser: true, useUnifiedTopology: true}, (err, db) => {
    if (err) throw err;
    let dbo = db.db('THX')
    dbo.collection(collection).insertOne(obj, (err, res) => {
      if (err) reject(err);
      console.log('文档插入成功')
      db.close()
      resolve()
    })
  })
})

// 获取英雄列表
async function getHeroList() {
  let httpUrl = 'https://game.gtimg.cn/images/lol/act/img/js/heroList/hero_list.js'
  let result = await axios.get(httpUrl)
  let heroList = result.data.hero
  console.log(heroList.length)
  await insertMany('heroList', heroList)
  return heroList
}

// getHeroList()

// 获取英雄信息，并存入数据库
async function getHero(heroId) {
  let httpUrl = `https://game.gtimg.cn/images/lol/act/img/js/hero/${heroId}.js`
  let result = await axios.get(httpUrl)
  await insertOne('heroInfo', result.data.hero)
  return result.data
}


// 定义主函数，获取所有英雄列表，循环遍历所有英雄并将详情信息存入数据库
async function run() {
  let heroList = await getHeroList()
  await heroList.reduce(async (pre, item, i) => new Promise(async (resolve, reject) => {
    await getHero(item.heroId)
    console.log('current', i)
    resolve()
  }))
  // await heroList.reduce(async (pre, item) => {
  //   await pre
  //   return new Promise(async (resolve, reject) => {
  //     await getHero(item.heroId)
  //     resolve()
  //   })
  // }, Promise.resolve())
}
run()