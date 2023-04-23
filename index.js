var request = require('request')
var fs = require('fs')
const cheerio = require("cheerio")
const maxCid = 2189//2245
const startCid = 2189 //2189
let url = 'https://www.cool18.com/bbs4/index.php?app=book&act=bookview&cid='
const path = './docs/sjd'
if (!fs.existsSync(path)) {
  fs.mkdirSync(path)
}
getData(startCid)

function getData(cid) {
  if (cid > maxCid) {
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
      let content = $('pre').html()//.replace(/<p>/g, '\n')
      content = content.replace(/<font color="#E6E6DD">cool18.com<\/font>/g, '')
      // content = content.replace(/<\/p>/g, '\n')
      // content = content.replace(/<br>/g, '\n')

      // console.log(content)
      fs.writeFile(path + '/' + cid + '.html', title + '<br>' + content, 'utf-8', (err, data) => {
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