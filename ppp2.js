const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const url = 'https://www.baidu.com/s?wd=puppeteer&rsv_spt=1&rsv_iqid=0xfc90a4d00000326d&issp=1&f=3&rsv_bp=1&rsv_idx=2&ie=utf-8&tn=baiduhome_pg&rsv_dl=ih_6&rsv_enter=1&rsv_sug3=2&rsv_sug1=2&rsv_sug7=001&rsv_sug2=1&rsv_btype=i&rsp=6&rsv_sug9=es_2_1&rsv_sug4=12320&rsv_sug=9' //替换为你要爬取的网页地址
  await page.goto(url);

  let content = await page.content()
  const $ = cheerio.load(content);
  

  await browser.close();
  const title = $.html();
  console.log(`${title}`);
})();