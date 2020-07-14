const cheerio = require('cheerio')
const axios = require('axios')
const con = require('./index')

let page = 1
let count = 9

// 延迟函数
let wait = (millSecondes) => new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('延迟', millSecondes)
    resolve('延迟：', millSecondes)
  }, millSecondes)
})

// 获取第num个页面的所有书籍的链接
async function getPageUrl(num) {
  let result = await axios.get('http://www.daihema.com/s/name/%E8%A5%BF%E5%AD%90%E7%BB%AA/' + num)
  // console.log(res)
  let $ = cheerio.load(result.data)

  $('.container .search-page .row h3 a').each(async (i, element) => {
    let pageUrl = $(element).attr('href')
    pageUrl = 'http://www.daihema.com' + pageUrl
    let title = $(element).attr('title')
    // wait(500*i)
    await getBookInfo(pageUrl)
    console.log(title, pageUrl)
  });
}

async function getBookInfo(pageUrl) {
  let result = await axios.get(pageUrl)
  let $ = cheerio.load(result.data)

  // 文件名称
  let title = $('.container .col-a h1').text().trim()
  // 文件大小
  let size = $('.container .col-a dl dd:first-child b').text().trim()
  if (size.indexOf('MB') != -1) {
    size = size.substring(0, size.indexOf('M')).trim()
    size += '000'
  } else if (size.indexOf('KB') != -1){
    size = size.substring(0, size.indexOf('K')).trim()
  } else {
    size = 0
  }
  size = parseInt(size)
  // 文件发布日期
  let date = $('.container .col-a dl dd:nth-child(2)').text()
  date = date.substring(date.indexOf('：') + 1).trim()
  // 文件类型
  let type = $('.container .col-a dl dd:nth-child(3)').text()
  type = type.substring(type.indexOf('：') + 1).trim()
  // 文件下载链接
  let downloadUrl = $('.container .col-a center a').attr('href')
  console.log(title, size, date, type, downloadUrl)
  let info = [title, type, size, date, pageUrl, downloadUrl]

  // 个别格式不正确
  if (size == '') {
    return
  }
  // 插入数据库
  let sql = 'insert into book (title, type, size, date, pageUrl, downloadUrl) values (?, ?, ?, ?, ?, ?)'
  con.query(sql, info, (err, results) => {
    if (err) {
      console.log(err)
    } else {
      console.log(results.insertId)
    }
  })
}

// getBookInfo('http://www.daihema.com/r/15573717')

(async () => {
  for (let i = 1; i <= count; i++) {
    // wait(3000*i)
    await getPageUrl(i)
    console.log(i, '--------------------------')
  }
})()
