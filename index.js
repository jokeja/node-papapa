const cool18 = require('./cool18')
const stock = require('./stock')
const baoshi = require('./baoshi')
const 补仓计算 = (本次单价, 期望卖出价格, 补仓股数, 现有股数, 现有每股成本) => {
  const 中国银行T = stock.makeTProfit(补仓股数, 期望卖出价格, 本次单价, 2 / 10000)
  const 补仓后每股单价 = stock.coverCost(现有股数, 现有每股成本, 补仓股数, 本次单价)
  const 中国银行利润 = stock.curProfit(补仓股数 + 现有股数, 现有每股成本, 补仓后每股单价, 2 / 10000)
  return { 补仓后每股单价, 补仓后股数: 补仓股数 + 现有股数 }
}
// cool18.beginPapapa()
// cool18.rewrite()
console.group('中国银行1')
const 补仓后结果1 = 补仓计算(5.43, 5.56, 800, 800, 5.5663)
console.groupEnd()
// console.group('中国银行2')
// const 补仓后结果2 = 补仓计算(5.15, 5.30, 800, 补仓后结果1.补仓后股数, 补仓后结果1.补仓后每股单价)
// console.groupEnd()
// const dls本次单价 = 4.46 // 第一次补仓4.46 第二次计划4.32
// const dls期望卖出价格 = 4.74 // 4.77
// const dls本次股数 = 400
// const dls上次股数 = 900
// const dls成本 = 5.1533
// const 德利斯T = stock.makeTProfit(dls本次股数, dls期望卖出价格, dls本次单价, 2 / 10000)

// const sc本次单价 = 0.6030
// const sc本次股数 = 2200
// const sc卖出单价 = 0.632
// const 深创T = stock.makeTProfit(sc本次股数, sc卖出单价, sc本次单价, 2 / 10000)
// const sc原始股数 = 7800
// const sc原始单价 = 0.8063
// const 深创补仓后单价 = stock.coverCost(sc原始股数, sc原始单价, sc本次股数, sc本次单价)
// const 深创利润 = stock.curProfit(sc本次股数 + sc原始股数, sc卖出单价, 深创补仓后单价, 2 / 10000)

// const rb本次单价 = 5.01
// const rb本次股数 = 300
// const rb卖出单价 = 5.3
// const 人保T = stock.makeTProfit(rb本次股数, rb卖出单价, rb本次单价, 2 / 10000)
// const rb原始股数 = 0
// const rb原始单价 = 0
// const 人保补仓后单价 = stock.coverCost(rb原始股数, rb原始单价, rb本次股数, rb本次单价)
// const 人保利润 = stock.curProfit(rb本次股数 + rb原始股数, rb卖出单价, 人保补仓后单价, 2 / 10000)

// 太平洋
// stock.coverCost(0, 0, 100, 4.89)
// stock.coverCost(100, 4.94, 200, 4.6)
// stock.curProfit(300, 3.78, 4.73, 2 / 10000)

// baoshi.testPuppeteer()


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