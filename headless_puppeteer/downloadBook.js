// 通过下载链接去下载书籍
const puppeteer = require('puppeteer');
const fs = require('fs');
const url = require('url');
const { fsRead, fsWrite } = require('./module');

(async () => {
  let debugOption = {
    defaultViewport: {
      width: 1400,
      height: 800
    },
    headless: false,
    slowMo: 250
  }
  let option = {
    headless: true
  }
  let browser = await puppeteer.launch(debugOption)

  // 延迟函数，减缓请求速度
  let wait = (millSecondes) => new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('延迟：', millSecondes)
    }, millSecondes)
  })

  

  async function parseTxt (path) {
    // 读取文本内容
    let textContent = await fsRead(path)

    // 正则匹配解析json字符串对象
    let reg = /(\{.*?\})/igs
    let res = ''
    let books = []
    while (res = reg.exec(textContent)) {
      // 匹配结果
      // console.log('res----------', res)
      let bookObj = JSON.parse(res[1])
      // console.log('obj--0----', bookObj)
      books.push(bookObj)
    }
    return books
  }

  let path = './book.txt'
  let books = await parseTxt(path)
  let index = 0

  async function downloadBook () {
    // 根据索引值下载书籍 index == books.length
    if (index == 2) {
      console.log('下载完成')
      return
    }
    let book = books[index]
    index++
    console.log('index---------', index)

    // 打开下载页面
    let page = await browser.newPage()
    await page.goto(book.url)
    // 等待selector渲染完成
    await page.waitForSelector('.slide-show-right .module-share-top-bar .x-button-box a:nth-child(2)')
    // 点击下载
    let downloadBtn = await page.$('.slide-show-right .module-share-top-bar .x-button-box a:nth-child(2)')
    // console.log('down--------', downloadBtn)
    downloadBtn.click()

    // 下载书籍方式：
    // 1.获取下载链接，axios请求下载
    // 2.浏览器页面点击操作去下载书籍

    // 监听请求是否完成
    // page.on('requestfinished', req => {
    //   console.log('下载完成：', req.url())
    // })
    downloadBook(path)
  }

  downloadBook(path)

})()