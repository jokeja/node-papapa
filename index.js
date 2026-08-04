const cool18 = require('./cool18')
const stock = require('./stock')
const baoshi = require('./baoshi')
const 补仓计算 = (本次单价, 期望卖出价格, 补仓股数, 现有股数, 现有每股成本,卖出股数) => {
  const 补仓后每股单价 = stock.coverCost(现有股数, 现有每股成本, 补仓股数, 本次单价)
  const 中国银行T = stock.makeTProfit(补仓股数, 期望卖出价格, 本次单价, 2 / 10000)
  const 上涨比例 = (期望卖出价格 - 补仓后每股单价) / 补仓后每股单价 * 100
  const 补仓后股数 = 补仓股数 + 现有股数
  const 卖出部分后成本 = stock.sellProfit(卖出股数, 补仓股数 + 现有股数, 期望卖出价格, 本次单价, 2 / 10000)
  const 卖出部分盈亏 = stock.curProfit(卖出股数, 期望卖出价格, 本次单价, 2 / 10000)
  return { 补仓后每股单价, 补仓后股数, 上涨比例, [`卖出${卖出股数}股`]: { 卖出部分盈亏, 卖出部分后成本 } }
}
// cool18.beginPapapa()
// cool18.rewrite()
// console.group('中国银行0')
// const 补仓后结果0 = 补仓计算(5.5600, 5.61, 800, 0, 0)
// console.groupEnd()
// console.group('中国银行')
// const 补仓后结果1 = 补仓计算(5.38, 5.42, 800, 800, 5.2423)
// console.groupEnd()
// console.group('中国银行2')
// const 补仓后结果2 = 补仓计算(5.33, 5.42, 800, 1600, 5.3966)
// console.groupEnd()
// console.group('中国银行2')
// const 补仓后结果2 = 补仓计算(5.15, 5.30, 800, 补仓后结果1.补仓后股数, 补仓后结果1.补仓后每股单价)
// console.groupEnd()

// [{ 本次单价: 5.82, 期望卖出价格: 5.93, 补仓股数: 2000, 现有股数: 0, 现有每股成本: 0 }
// ].forEach((item, index) => {
//   console.group(`中国银行${item.本次单价}`)
//   const result = 补仓计算(item.本次单价, item.期望卖出价格, item.补仓股数, item.现有股数, item.现有每股成本)
//   console.log(result)
//   console.groupEnd()
// })
let last补仓成本 = 0;
[{ 本次单价: 8.71, 期望卖出价格: 8.9, 补仓股数: 1000, 现有股数: 0,卖出股数:0, 现有每股成本: 0 }
].forEach((item, index) => {
  console.group(`渤海轮渡${item.本次单价}`)
  const result = 补仓计算(item.本次单价, item.期望卖出价格, item.补仓股数, item.现有股数, last补仓成本, item.卖出股数)
  last补仓成本 = result.补仓后每股单价
  console.log(result)
  console.groupEnd()
})

// try {
//   let a
//   const n = 60
//   console.time(a)
//   let fb_rst = fbnc(n);
//   let b = new Date().getTime();
//   console.timeEnd(a)
//   console.log(n)
// } catch (e) {
//   console.log(e)
// }