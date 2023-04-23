var request = require('request')
var fs = require('fs')
const cheerio = require("cheerio")
const endCid = 2245//2245
const startCid = 2191 //2189
let url = 'https://www.cool18.com/bbs4/index.php?app=book&act=bookview&cid='
const path = './docs/sjd'

function getData(cid) {
  if (cid > endCid) {
    return
  }
  const r_url = url + cid
  request({
    url: r_url,  //2245
    proxy: 'http://127.0.0.1:10809'
  }, function (err, resp, body) {
    console.log(cid + '_err:', err)
    if (!err) {
      const $ = cheerio.load(body);
      let title = $('meta[name="Description"]').attr('content')
      let content = title + '<br>' + $('pre').html()//.replace(/<p>/g, '\n')
      content = content.replace(/<font color="#E6E6DD">cool18.com<\/font>/g, '')
      // content = content.replace(/<\/p>/g, '\n')
      // content = content.replace(/<br>/g, '\n')
      let lastPage = ''
      let nextPage = ''
      if (cid > startCid) {
        lastPage = '<a href="./' + (cid - 1) + '.html">上一页</a>'
      }
      if (cid < endCid) {
        nextPage = '<a href="./' + (cid + 1) + '.html">下一页</a>'
      }
      content += `<div style='text-align: center;'>${lastPage}${nextPage}</div>`
      let nBody = `<body style='font-size: 24px;'>${content}</body>`
      // console.log(content)
      fs.writeFile(path + '/' + cid + '.html', nBody, 'utf-8', (err, data) => {
        console.log('----writeFile--err------', err)
        // console.log('------data------', data)
        getData(++cid)
      })
    } else {
      console.log('retry:' + cid)
      getData(cid)
    }
  })
}

function beginPapapa() {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path)
  }
  getData(startCid)
}

function rewrite() {
  let files = fs.readdirSync(path)
  console.log('-------------')
  files.forEach(fItem => {
    console.log(fItem)
    let filePath = path + '/' + fItem
    var content = fs.readFileSync(filePath, 'utf-8')
    content = content.replace(`font-size: 24px;`, `font-size: 24px;background: black;color: #fafafa;`)
    fs.writeFileSync(filePath, content)
  })
}

module.exports = {
  beginPapapa,
  rewrite
}