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
    headless: false
  }
  const browser = await puppeteer.launch(option);

  // 打开页面
  let page = await browser.newPage();

  // 页面跳转到百度
  await page.goto('https://www.dytt8.net/index.htm');

  // 截图
  await page.screenshot({path: 'dytt.png'});

  // 获取信息$$rval(selector, data), 回调函数可以在浏览器中运行
  let elements = await page.$$eval('#header #menu li a', data => {
    // 收集导航信息
    let elements = []
    data.forEach((item, i) => {
      // 在浏览器控制台输出
      // console.log(item.innerText);
      
      let href = item.getAttribute('href')
      if (href != '#' && href != '/app.html') {
        // console.log(href, item.innerText)
        elements.push({url: href, text: item.innerText})
      }
    })
    return elements
  });

  
  // 监听控制浏览器
  // page.on('console', (...args) => {
  //   // 终端输出
  //   console.log(args[0]._text)
  // })
  page.on('console', event => {
    // console.log(event.text())
  })

  console.log(elements)
  let gnPage = await browser.newPage();
  gnPage.goto(elements[2].url) 

  // 关闭浏览器
  // browser.close();
})();