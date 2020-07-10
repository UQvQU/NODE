const puppeteer = require('puppeteer');

// headless(无界面模式)
(async () => {

  // puppeteer.launch实例化开启浏览器
  // 传入一个option对象，可配置为无界面浏览器或有界面浏览器
  // 无界面浏览器性能更高, 有界面一般用于调试开发
  let option = {
    // 可视区域大小
    defaultViewport: {
      width: 1280,
      height: 600
    },
    // 是否有界面
    headless: false,
    // 放慢操作速度
    slowMo: 300
  }
  const browser = await puppeteer.launch(option);

  // 打开页面
  let page = await browser.newPage();

  // 页面跳转到百度
  await page.goto('https://www.dytt8.net/index.htm');

  let eleHandles = await page.$$('#header #menu li a')
  // 获取并且触发第三个元素的点击事件,页面跳转
  // console.log(eleHandles[2])
  // await eleHandles[2].click()

  // 获取表单并输入进行搜索(获取一个对象使用$(), 获取多个对象使用$$())
  let inputElement = await page.$('.search .searchl p input')
  // 让光标聚焦到输入框
  await inputElement.focus()
  // page对象：输入内容
  await page.keyboard.type('蝙蝠侠')
  // 取消冒泡
  await page.$eval('.bd3rl>.search', ele => {
    ele.addEventListener('click', event => {
      event.cancelBubble = true
    })
  })
  // 点击按钮回车或点击立即搜索
  await page.keyboard.press('Enter')
  // let btn = await page.$('.search .searchr input')
  // await btn.click()

  // 

  // 关闭浏览器
  // browser.close();
})();