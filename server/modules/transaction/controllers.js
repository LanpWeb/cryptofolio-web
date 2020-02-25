const CryptocurrencyService = require("../cryptocurrency/services");
const TransactionService = require("./services");

const asyncForEach = require("../../utils/asyncForEach");

exports.getTransactions = async ctx => {
  const { id } = ctx.state.user;
  const { start, limit } = ctx.request.query;

  const options = {
    skip: parseInt(start, 10) || 0,
    limit: parseInt(limit, 10) || 10
  };

  try {
    const transactions = await TransactionService.getTransactions(id, options);

    ctx.status = 200;
    ctx.body = transactions;
  } catch (err) {
    ctx.throw(err.message, 400);
  }
};

exports.createTransaction = async ctx => {
  const { id } = ctx.state.user;
  const {
    type, coin, amount, price, date
  } = ctx.request.body;

  try {
    await TransactionService.create(id, type, amount, price, coin, date);

    ctx.status = 200;
  } catch (err) {
    ctx.throw(err.message, 400);
  }
};

exports.editTransaction = async ctx => {
  const { transactionId } = ctx.params;
  const {
    type, coin, amount, price, date
  } = ctx.request.body;

  try {
    await TransactionService.edit(transactionId, type, amount, price, coin, date);

    ctx.status = 200;
  } catch (err) {
    ctx.throw(err.message, 400);
  }
};

exports.deleteTransaction = async ctx => {
  const { transactionId } = ctx.params;

  try {
    await TransactionService.delete(transactionId);

    ctx.status = 200;
  } catch (err) {
    ctx.throw(err.message, 400);
  }
};

exports.getPortfolio = async ctx => {
  const { id } = ctx.state.user;

  let graphCurrentValue = 0;
  const result = {
    currentValue: 0,
    change24h: {
      value: 0,
      percent: 0
    },
    totalCost: 0,
    totalProfit: 0,
    holdings: [],
    graph: []
  };

  try {
    const coins = await TransactionService.getAllTransactionsCoins(id);
    await asyncForEach(coins, async coin => {
      const quoteRes = await CryptocurrencyService.getQuote(coin.id);
      const { totalAmount, totalCost } = await TransactionService.getTotalInfo(id, coin);

      const myValue = quoteRes.quote.USD.price * totalAmount[0].value;
      const change24hValue = myValue * quoteRes.quote.USD.percent_change_24h;
      const profit = myValue - totalCost[0].value;

      result.currentValue += myValue;
      result.totalCost += totalCost[0].value;
      result.totalProfit += profit;
      result.change24h.value += change24hValue;
      result.holdings.push({
        coinId: quoteRes.id,
        name: quoteRes.name,
        price: quoteRes.quote.USD.price,
        change24h: quoteRes.quote.USD.percent_change_24h,
        totalAmount: totalAmount[0].value,
        totalCost: totalCost[0].value,
        myValue,
        profit
      });
    });

    const dates = await TransactionService.getAllTransactionsDates(id);
    await asyncForEach(dates, async date => {
      const transactions = await TransactionService.getTransactionsByDate(id, date);

      await asyncForEach(transactions, async transaction => {
        const quoteRes = await CryptocurrencyService.getHistoricQuote(transaction.coin.id, date);
        const myValue = quoteRes.quotes[0].quote.USD.price * transaction.amount;
        graphCurrentValue += myValue;
      });

      result.graph.push({ price: graphCurrentValue, date });
    });

    result.change24h.percent = (result.change24h.value * 100) / result.currentValue;
    result.holdings.sort((a, b) => b.price - a.price);

    ctx.status = 200;
    ctx.body = result;
  } catch (err) {
    ctx.throw(err.message, 400);
  }
};

// exports.getStats = async ctx => {
//   const { id } = ctx.state.user;

//   try {
//     const result = {
//       currentValue: 0,
//       change24h: {
//         value: 0,
//         percent: 0
//       },
//       totalCost: 0,
//       totalProfit: 0
//     };

//     const coins = await TransactionService.getAllTransactionsCoins(id);
//     await asyncForEach(coins, async coin => {
//       const quoteRes = await CryptocurrencyService.getQuote(coin.id);
//       const { totalAmount, totalCost } = await TransactionService.getTotalInfo(id, coin);

//       const myValue = quoteRes.quote.USD.price * totalAmount[0].value;
//       const change24hValue = myValue * quoteRes.quote.USD.percent_change_24h;

//       result.currentValue += myValue;
//       result.totalCost += totalCost[0].value;
//       result.totalProfit += myValue - totalCost[0].value;
//       result.change24h.value += change24hValue;
//     });

//     result.change24h.percent = (result.change24h.value * 100) / result.currentValue;

//     ctx.status = 200;
//     ctx.body = result;
//   } catch (err) {
//     ctx.throw(err.message, 400);
//   }
// };

// exports.getHoldings = async ctx => {
//   const { id } = ctx.state.user;

//   try {
//     const result = [];

//     const coins = await TransactionService.getAllTransactionsCoins(id);
//     await asyncForEach(coins, async coin => {
//       const quoteRes = await CryptocurrencyService.getQuote(coin.id);
//       const { totalAmount, totalCost } = await TransactionService.getTotalInfo(id, coin);

//       const myValue = quoteRes.quote.USD.price * totalAmount[0].value;

//       result.push({
//         coinId: quoteRes.id,
//         name: quoteRes.name,
//         price: quoteRes.quote.USD.price,
//         change24h: quoteRes.quote.USD.percent_change_24h,
//         totalAmount: totalAmount[0].value,
//         totalCost: totalCost[0].value,
//         myValue,
//         profit: myValue - totalCost[0].value
//       });
//     });

//     ctx.status = 200;
//     ctx.body = result.sort((a, b) => b.price - a.price);
//   } catch (err) {
//     ctx.throw(err.message, 400);
//   }
// };

// exports.getGraph = async ctx => {
//   const { id } = ctx.state.user;

//   try {
//     const result = [];
//     let currentValue = 0;

//     const dates = await TransactionService.getAllTransactionsDates(id);
//     await asyncForEach(dates, async date => {
//       const transactions = await TransactionService.getTransactionsByDate(id, date);

//       await asyncForEach(transactions, async transaction => {
//         const quoteRes = await CryptocurrencyService.getHistoricQuote(transaction.coin.id, date);
//         const myValue = quoteRes.quotes[0].quote.USD.price * transaction.amount;
//         currentValue += myValue;
//       });

//       result.push({ price: currentValue, date });
//     });

//     ctx.status = 200;
//     ctx.body = result;
//   } catch (err) {
//     ctx.throw(err.message, 400);
//   }
// };
