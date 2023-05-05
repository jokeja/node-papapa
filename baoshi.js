var request = require('request')
var fs = require('fs')
const cheerio = require("cheerio")
const CryptoJS = require('crypto-js')
const encoding = require('encoding')
const XMLHttpRequest = require('node-http-xhr')
const puppeteer = require('puppeteer');
const { resolve } = require('path')

// https://www.xinremenxs.com/read/info/7037531-34293761-343342274.js?token=351567d31ceb2d0fc94627c581001716
let userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36"
let cid = 343344057
// 343344282
let filePath = './docs/sydg'
async function getData(cid) {
  const ossUrl = await ossUrl(cid)
  loadInPuppeteer(ossUrl, cid)
}

function ossUrl(cid) {
  var token = CryptoJS.HmacMD5(String(cid), userAgent).toString()
  const url = 'https://www.xinremenxs.com/read/Content/' + cid + '.js?token=' + token
  return new Promise((resolve, reject) => {
    request.get(url, {
      headers: {
        'user-agent': userAgent
      }
    }, function (err, resp, body) {
      console.log('-----err----', err)
      console.log('-----body----', body)
      let ossUrl = 'https://ebooktxt.oss-cn-shenzhen.aliyuncs.com'
      let decParams = CryptoJS.AES.decrypt(body, CryptoJS.enc.Utf8.parse(token.substr(0, 16)), { iv: CryptoJS.enc.Utf8.parse(token.substr(16)), mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString(CryptoJS.enc.Utf8)
      if (decParams) {
        ossUrl += decParams
        ossUrl += "&t=" + new Date().valueOf()
        resolve(ossUrl)
      } else {
        reject()
      }
      // getOssData(ossUrl)
      console.log('-------ossUrl-------', ossUrl)
    })
  })
}

function loadInPuppeteer(ossUrl, cid) {
  // 343342256  343344282
  if (cid > 343344282) {
    return
  }
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(ossUrl);
    let content = await page.content()
    await browser.close();
    console.log('----content----', content)
    content = content.replace(/pre/g, 'div')
    content = content.replace(/　　/g, '<br>')
    await writeToFile(cid, content)
    getData(++cid)

  })();
}

function requestXHR(ossUrl) {

  var httpRequest2 = new XMLHttpRequest();
  httpRequest2.open('GET', ossUrl, true);
  httpRequest2.overrideMimeType("text/plain;charset=utf-8");
  httpRequest2.onerror = function () {
    console.log('----onerror----', this)
  };
  httpRequest2.onload = async function () {
    if (this.status === 200) {
      var html = this.responseText;
      // const rstBody1 = encoding.convert(html, 'gb2312', 'gbk')
      console.log('------onload------', html)
      // console.log('------rstBody1------', rstBody1.toString())
    }
  }
  httpRequest2.send();
}

function getOssData(ossUrl) {
  request.get(ossUrl, {
    headers: {
      'user-agent': userAgent,
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'zh-CN,zh;q=0.9'
    },
    encoding: 'UTF-8'
  }, function (err1, resp1, body1) {
    const rstBody1 = encoding.convert(body1, 'utf-8', 'gb2312')
    console.log('-----err1----', err1)
    console.log('-------body1----------', body1)
  })
}
function beginPapapa() {
  getData(cid)
}

function rewrite() {
  let files = fs.readdirSync(filePath)
  files.forEach((fItem, index) => {
    console.log(fItem)
    let name = fItem.replace('.html', '')
    let nameNum = Number(name)
    console.log('nameNum:', nameNum)
    let newPath = filePath + '/' + fItem
    var content = fs.readFileSync(newPath, 'utf-8')
    let lastPage = ''
    if (nameNum > 343342256) {
      lastPage = `<a href="./${(nameNum - 1)}.html">上一页</a>`
    }
    let nextPage = ''
    if (nextPage < 343344282) {
      nextPage = `<a href="./${nameNum + 1}.html">下一页</a>`
    }
    content = content.replace(`</pre>`, `</pre><div style='text-align: center;'>${lastPage}${nextPage}</div>`)
    content = content.replace(/pre/g, 'div')
    content = content.replace(/　　/g, '<br>')
    fs.writeFileSync(newPath, content)
  })
}

function changeTag() {
  let files = fs.readdirSync(filePath)
  files.forEach((fItem, index) => {
    console.log(fItem)
    let name = fItem.replace('.html', '')
    let nameNum = Number(name)
    console.log('nameNum:', nameNum)
    let newPath = filePath + '/' + fItem
    var content = fs.readFileSync(newPath, 'utf-8')
    content = content.replace(/pre/g, 'div')
    content = content.replace(/　　/g, '<br>')
    fs.writeFileSync(newPath, content)

  })
}


function writeToFile(cid, content) {
  return new Promise((resolve, reject) => {
    let lastPage = ''
    if (cid > 343342256) {
      lastPage = `<a href="./${(cid - 1)}.html">上一页</a>`
    }
    let nextPage = ''
    if (cid < 343344282) {
      nextPage = `<a href="./${cid + 1}.html">下一页</a>`
    }
    if (content.indexOf('html') == -1) {
      content = `<html><head><meta name="color-scheme" content="light dark"></head><body><div style="word-wrap: break-word; white-space: div-wrap;">${content}</div><div style='text-align: center;'>${lastPage}${nextPage}</div></body></html>`
    }
    fs.writeFile(filePath + '/' + cid + '.html', content, 'utf-8', (err, data) => {
      console.log('----writeFile--err------', err)
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}
function testPuppeteer(cid = 343344145) {

  const getArticle = async (browser, cid) => {
    if (cid > 343344282) {
      return
    }
    const page = await browser.newPage();
    await page.goto('https://www.xinremenxs.com/load.html#7037531-57793047-' + cid);

    // const wOssUrl = await ossUrl(cid)
    let content = await page.$eval('article', el => el.innerHTML)
    console.log('----content----', content)
    if (content.indexOf('请稍后') >= 0){
      getArticle(browser, cid)
    } else {
      await writeToFile(cid, content)
    }
    return cid
  }


  (async () => {
    const browser = await puppeteer.launch();
    // 
    let tCid = await getArticle(browser, cid)
    // console.log('----content.innerHTML----', content.innerHTML)
    await browser.close();
    testPuppeteer(++tCid)
    // let lastPage = ''
    // if (cid > 343342256) {
    //   lastPage = `<a href="./${(cid - 1)}.html">上一页</a>`
    // }
    // let nextPage = ''
    // if (cid < 343344282) {
    //   nextPage = `<a href="./${cid + 1}.html">下一页</a>`
    // }
    // content = content.replace(`</pre>`, `</pre><div style='text-align: center;'>${lastPage}${nextPage}</div>`)
    // content = content.replace(/pre/g, 'div')
    // content = content.replace(/　　/g, '<br>')
    // fs.writeFile(filePath + '/' + cid + '.html', content, 'utf-8', (err, data) => {
    //   console.log('----writeFile--err------', err)
    //   // console.log('------data------', data)
    //   getData(++cid)
    // })
  })();
}


module.exports = {
  beginPapapa,
  rewrite,
  changeTag,
  testPuppeteer
}
