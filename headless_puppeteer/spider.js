// 爬取呆河马网站的电子书
const puppeteer = require('puppeteer');

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
  let httpUrl = 'http://www.daihema.com/s/name/javascript'


  // 获取http://www.daihema.com/s/name/javascript中的书名和链接
  // 1. 进入网站，获取书籍列表页数
  async function getPageNumber(url) {
    let page = await browser.newPage()
    await page.goto(url)
    let num = await page.$eval('.container .search-page .page-list .pcount', ele => {
      let text = ele.innerText
      text = text.substring(1, text.length - 3).trim()
      // console.log('------', ele.innerText)
      return text
    })
    // 节约内存
    page.close()
    return num
  }


  // 2. 获取列表页的所有电子书的链接
  // let pageNum = await getPageNumber(httpUrl)
  // console.log('pageNum', pageNum)
  async function getPageList(num) {
    let pageListUrl = httpUrl + '/' + num
    let page = await browser.newPage()

    // 在跳转之前，监听请求事件，拦截谷歌广告请求
    await page.setRequestInterception(true)
    page.on('request', interceptedRequest => {
      let urlObj = url.parse(interceptedRequest.url())
      if (urlObj.hostname == 'googleads.g.doubleclick.net') {
        // 是谷歌广告请求， 放弃当次请求（广告请求响应慢）
        interceptedRequest.abort()
      } else {
        interceptedRequest.continue()
      }
    })

    // 访问列表页
    await page.goto(pageListUrl)

    // 获取资源的类型
    let typeList = await page.$$eval('.container .search-page .row p .small a:first-child', elements => {
      // console.log('-------------', el.innerText)
      let list = []
      elements.forEach( el => {
        list.push(el.innerText.trim())
      })
      return list
    })
    console.log('type----', typeList.length)

    let pageList = await page.$$eval('.container .search-page .row h3 a', elements => {
      let bookList = []
      elements.forEach(async (ele, i) => {
          let obj = {
            url: ele.getAttribute('href'),
            title: ele.getAttribute('title')
          }
          bookList.push(obj)
      })
      return bookList
    })
    console.log(pageList.length)

    page.close()

    // 判断资源是否是文档
    let key = 0
    for (let i = 0; i < typeList.length; i++, key++) {
      // console.log('type：', i, typeList[i])
      if (typeList[i] != '文档') {
        // console.log(i, typeList[i])
        pageList.splice(key, 1)
        key--
      }
    }
    console.log('pageList:', pageList.length)
 
    // 获取下载链接
    pageList.forEach(async pageObj => {
      await getPageInfo(pageObj)
    })
  }

  let pageList = await getPageList(1)

  // 3. 进入每个电子书详情页获取网盘地址
  async function getPageInfo(pageObj) {
    let page = await browser.newPage()
    // console.log('obj------', pageObj)

    await page.goto(`http://www.daihema.com/${pageObj.url}`)
    let downloadBtn = await page.$('.resource-page center a:first-child')
    let url = await downloadBtn.getProperty('href')
    console.log('url-----------', url._remoteObject.value)
    // page.close()
  }



  // 4. 将数据保存到文档里
})()