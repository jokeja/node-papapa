const axios = require('axios');
//cheerio是nodejs的抓取页面模块，为服务器特别定制的，快速、灵活、实施的jQuery核心实现。适合各种Web爬虫程序
const cheerio = require('cheerio');

const url = 'https://www.baidu.com/s?wd=puppeteer&rsv_spt=1&rsv_iqid=0xfc90a4d00000326d&issp=1&f=3&rsv_bp=1&rsv_idx=2&ie=utf-8&tn=baiduhome_pg&rsv_dl=ih_6&rsv_enter=1&rsv_sug3=2&rsv_sug1=2&rsv_sug7=001&rsv_sug2=1&rsv_btype=i&rsp=6&rsv_sug9=es_2_1&rsv_sug4=12320&rsv_sug=9' // 替换为你要爬取的网页地址
// 有时候会遇到页面异步加载的问题可以使用google的模拟器
// Puppeteer 是一个控制 headless Chrome 的 Node.js API 。它是一个 Node.js 库，通过 DevTools 协议提供了一个高级的 API 来控制 headless Chrome
//const puppeteer = require('puppeteer');
axios.get(url)
  .then((response) => {
    if (response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);

      const title = $.text();
      console.log(`${title}`);
    }
  })
  .catch((error) => {
    console.error('发生错误：', error);
  });