
// 上海 过户费 = 成交金额*0.2/10000
// 佣金 = 成交金额*0.2/1000(平安) 不超过成交额的3‰ 最低5元
// 上海 过户费 = 成交金额*0.1/10000

const c_commissionRate = 0.00025 // 万2.5
const c_minCommission = 5       // 最低5元
const c_stampDutyRate = 0.0005    // 0.1%
const c_transferFeeRate = 0.00001 // 万分之0.1


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


/**
 * 计算股票交易的详细费用和净盈亏
 * @param {number} buyPrice - 买入单价
 * @param {number} sellPrice - 卖出单价
 * @param {number} shares - 股数 (必须是100的整数倍)
 * @param {object} options - 可选配置
 * @param {number} options.commissionRate - 佣金率 (默认 0.00025 即万2.5)
 * @param {number} options.minCommission - 最低佣金 (默认 5)
 * @param {number} options.stampDutyRate - 印花税率 (默认 0.001 即0.1%，仅卖出收)
 * @param {number} options.transferFeeRate - 过户费率 (默认 0.00001 即万分之0.1)
 */
function calculateStockProfit(buyPrice, sellPrice, shares) {

  let 买入明细 = buyStockFee(buyPrice, shares)
  let 卖出明细 = sellStockFee(sellPrice, shares)
  // 计算保本涨幅 (用于参考)
  const breakEvenPercent = ((买入明细.实际花费金额 + 卖出明细.卖出费用) / 买入明细.买入金额) * 100;
  return {
    买入明细,
    卖出明细,
    毛利率: (卖出明细.卖出金额 - 买入明细.买入金额), // 毛利润(不含费)
    净利率: 卖出明细.实际到手金额 - 买入明细.实际花费金额,                   // 净利润(含费)
    涨幅: breakEvenPercent + '%' // 保本所需涨幅
  };
}

function buyStockFee(price, num) {
  // 1. 计算买入成本
  const buyAmount = price * num;

  // 买入佣金：取计算值和最低佣金的较大值
  let buyCommission = buyAmount * c_commissionRate;
  if (buyCommission < c_minCommission) {
    buyCommission = c_minCommission;
  }

  // 买入过户费
  const buyTransferFee = buyAmount * c_transferFeeRate;

  // 买入总费用
  const totalBuyCost = buyAmount + buyCommission + buyTransferFee;
  return {
    买入金额: buyAmount,
    // 佣金: buyCommission,
    // 过户费: buyTransferFee,
    买入费用: buyCommission + buyTransferFee,
    实际花费金额: totalBuyCost
  }
}
function sellStockFee(sellPrice, num) {
  // 2. 计算卖出收入
  const sellAmount = sellPrice * num;

  // 卖出佣金
  let sellCommission = sellAmount * c_commissionRate;
  if (sellCommission < c_minCommission) {
    sellCommission = c_minCommission;
  }

  // 卖出印花税 (仅卖出收取)
  const sellStampDuty = sellAmount * c_stampDutyRate;

  // 卖出过户费
  const sellTransferFee = sellAmount * c_transferFeeRate;

  // 卖出总扣除费用
  const totalSellFees = sellCommission + sellStampDuty + sellTransferFee;

  // 卖出实际到手金额
  const netSellAmount = sellAmount - totalSellFees;
  return {
    卖出金额: sellAmount,
    // 佣金: sellCommission,
    // 印花税: sellStampDuty,
    // 过户费: sellTransferFee,
    卖出费用: totalSellFees,
    实际到手金额: netSellAmount
  }
}


// 计算本次成本
//单股金额，总股数，佣金费率 一般为 万分之2 或千分之0.2，过户费费率(上证0.2/10000)
function stockCost(perMoney, totalNum) {
  let 买入明细 = buyStockFee(perMoney, totalNum)
  const rst = 买入明细.实际花费金额 / totalNum

  // console.log(`本次成本(总股数:${totalNum},单股金额:${perMoney},佣金费率:${commissionRate},手续费:${commissionAmount})==${rst}`)
  return rst
}

// 补仓成本计算
// 原始股数 原始单股成本 本次股数 本次单股金额
function coverCost(oriStockNo, oriCost, curStockNo, curPermoney) {
  let curCost = stockCost(curPermoney, curStockNo)
  let rst = (oriStockNo * oriCost + curStockNo * curCost) / (oriStockNo + curStockNo)
  console.log(`补仓后每股成本(原始股数:${oriStockNo},原始单股成本:${oriCost},本次股数:${curStockNo},本次单股金额:${curPermoney})==${rst}`)
  return rst
}


// 做T利润 所得利润为=（卖出价-买入价）*股数-买卖佣金和印花税及沪市过户费
// 做T股数，卖出价，买入价，佣金费率，过户费率
function makeTProfit(tStockNum, sellPrice, buyPrice) {
  let result = calculateStockProfit(buyPrice, sellPrice, tStockNum)
  // let commAmount = result.卖出明细.卖出费用 + result.买入明细.买入费用
  console.log(result)
  return result.净利率
}

module.exports = {
  makeTProfit,
  coverCost,
  stockCost

}