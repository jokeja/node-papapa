const cool18 = require('./cool18')
const stock = require('./stock')
const baoshi = require('./baoshi')
// cool18.beginPapapa()
// cool18.rewrite()
// const 深创1 = stock.coverCost(7800, 0.8036,3200, 0.7540, 2 / 10000)
// const 深创2 = stock.makeTProfit(3200, 0.7630, 0.7540, 2 / 10000)
// const dls本次单价 = 5.55
// const dls本次股数 = 600
// const dls上次股数 = 400
// const 德利斯T = stock.makeTProfit(dls本次股数, 5.72, dls本次单价, 2 / 10000)
// const 德利斯补仓后单价 = stock.coverCost(dls上次股数, 5.72, dls本次股数, dls本次单价)
// const 德利斯利润 = stock.curProfit(dls本次股数 + dls上次股数, 5.72, dls德利斯补仓后单价, 2 / 10000)

// const sc本次单价 = 0.637
// const sc本次股数 = 2200
// const sc卖出单价 = 0.666
// const 深创T = stock.makeTProfit(sc本次股数, sc卖出单价, sc本次单价, 2 / 10000)
// const sc原始股数 = 7800
// const sc原始单价 = 0.8063
// const 深创补仓后单价 = stock.coverCost(sc原始股数, sc原始单价, sc本次股数, sc本次单价)
// const 深创利润 = stock.curProfit(sc本次股数 + sc原始股数, sc卖出单价, 深创补仓后单价, 2 / 10000)

const rb本次单价 = 5.01
const rb本次股数 = 300
const rb卖出单价 = 5.3
const 人保T = stock.makeTProfit(rb本次股数, rb卖出单价, rb本次单价, 2 / 10000)
const rb原始股数 = 0
const rb原始单价 = 0
const 人保补仓后单价 = stock.coverCost(rb原始股数, rb原始单价, rb本次股数, rb本次单价)
const 人保利润 = stock.curProfit(rb本次股数 + rb原始股数, rb卖出单价, 人保补仓后单价, 2 / 10000)


// baoshi.testPuppeteer()