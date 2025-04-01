

const axios = require('axios');
//cheerio是nodejs的抓取页面模块，为服务器特别定制的，快速、灵活、实施的jQuery核心实现。适合各种Web爬虫程序
const cheerio = require('cheerio');
const fs = require('fs');
const dataArray = []
function kaiba(page) {
  let url = `https://www.jugongxu.com/ShortVideo/Cards/${page}/view.html`
  axios.get(url)
    .then((response) => {
      if (response.status === 200) {
        const html = response.data;
        const $ = cheerio.load(html);

        const children = $('.yb-list-info').children();

        children.each((index, element) => {
          const username = $(element).find('.username').text().trim();
          const company = $(element).find('.user-company').text().trim();
          const tag = $(element).find('.user-tag').text().trim();
          dataArray.push({
            username, company, tag
          })
          console.log(username, company, tag);
        })

        const nextPage = $('#paging [jp-role="next"]');
        if (nextPage.hasClass('disabled')) {
          console.log('Next page button is disabled.');
          fs.writeFile('output.json', JSON.stringify(dataArray, null, 2), (err) => {
            if (err) {
              console.error('Error writing to file:', err);
            } else {
              console.log('Data successfully written to output.json');
            }
          });
          return;
        }
        const nextPageData = nextPage.attr('jp-data');
        kaiba(nextPageData)
      }
    })
    .catch((error) => {
      console.error('发生错误：', error);
    });
}
kaiba(1)
// const children = document.getElementsByClassName('yb-list-info')[0].children

// for (var index = 0; index < children.length; index++) {
//   let a = children[index]
//   let username = (a.getElementsByClassName('username')[0] || {}).textContent || ''
//   let company = (a.getElementsByClassName('user-company')[0] || {}).textContent || ''
//   let tag = (a.getElementsByClassName('user-tag')[0] || {}).textContent || ''
//   console.log(`${username.replaceAll('\n', '')}  ${company.replaceAll('\n', ' ')}  ${tag.replaceAll('\n', ' ')}`)
// }
