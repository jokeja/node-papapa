
// 上海 过户费 = 成交金额*0.2/10000
// 佣金 = 成交金额*0.2/1000(平安) 不超过成交额的3‰ 最低5元
// 上海 过户费 = 成交金额*0.1/10000


// 计算手续费
function commisionAmount(perMoney, totalNum, commissionRate, transferRate = 0.1 / 10000) {
  let dealAmount = perMoney * totalNum
  let commissionAmount = dealAmount * commissionRate
  let maxComAmount = dealAmount * 3 / 1000
  if (commissionAmount < 5) {
    commissionAmount = 5
  } else if (commissionAmount > maxComAmount) {
    commissionAmount = maxComAmount
  }
  let transferAmount = dealAmount * transferRate
  return commissionAmount + transferAmount
}

// 计算本次成本
//单股金额，总股数，佣金费率 一般为 万分之2 或千分之0.2，过户费费率(上证0.2/10000)
function stockCost(perMoney, totalNum, commissionRate, transferRate = 0.1 / 10000) {
  let dealAmount = perMoney * totalNum
  let commissionAmount = commisionAmount(perMoney, totalNum, commissionRate, transferRate)
  const rst = (dealAmount + commissionAmount) / totalNum
  
  // console.log(`本次成本(总股数:${totalNum},单股金额:${perMoney},佣金费率:${commissionRate},手续费:${commissionAmount})==${rst}`)
  return rst
}

// 补仓成本计算
// 原始股数 原始单股成本 本次股数 本次单股金额
function coverCost(oriStockNo, oriCost, curStockNo, curPermoney) {
  let curCost = stockCost(curPermoney, curStockNo, 2 / 10000)
  let rst = (oriStockNo * oriCost + curStockNo * curCost) / (oriStockNo + curStockNo)
  console.log(`补仓后每股成本(原始股数:${oriStockNo},原始单股成本:${oriCost},本次股数:${curStockNo},本次单股金额:${curPermoney})==${rst}`)
}


// 做T利润 所得利润为=（卖出价-买入价）*股数-买卖佣金和印花税及沪市过户费
// 做T股数，卖出价，买入价，佣金费率，过户费率
function makeTProfit(tStockNum, sellPrice, buyPrice, commissionRate, transferRate = 0.1 / 10000) {
  let rst = (sellPrice - buyPrice) * tStockNum - (commisionAmount(sellPrice, tStockNum, commissionRate, transferRate) + commisionAmount(buyPrice, tStockNum, commissionRate, transferRate))

  console.log(`makeTProfit(tStockNum:${tStockNum},sellPrice:${sellPrice},buyPrice:${buyPrice})==${rst}`)
}

module.exports = {
  makeTProfit,
  coverCost,
  stockCost
}