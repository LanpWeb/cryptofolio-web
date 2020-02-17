const mongoose = require("mongoose");
const withAuth = require("../../middleware/withAuth");

const Transaction = require("../../models/transactions");

const asyncForEach = require("../../utils/asyncForEach");

const getQuote = require("../coinmarketcap/quote");
const getHistoricQuote = require("../coinmarketcap/historicQuote");

exports.init = router => {
  router.get("/api/portfolio/graph", withAuth, async ctx => {
    const { id } = ctx.state.user;

    const result = [];
    let currentValue = 0;

    const dates = await Transaction.find({ userId: id }).distinct("date");
    await asyncForEach(dates, async date => {
      const transactions = await Transaction.find({ userId: id, date });

      await asyncForEach(transactions, async transaction => {
        const quoteRes = await getHistoricQuote(transaction.coinId, date);
        const myValue = quoteRes.quotes[0].quote.USD.price * transaction.amount;

        currentValue += myValue;
      });

      result.push({
        price: currentValue,
        date
      });
    });

    ctx.status = 200;
    ctx.body = result;
  });

  router.get("/api/portfolio/holdings", withAuth, async ctx => {
    const { id } = ctx.state.user;

    const result = [];

    const coinIds = await Transaction.find({ userId: id }).distinct("coinId");
    await asyncForEach(coinIds, async coinId => {
      const quoteRes = await getQuote(coinId);

      const totalAmount = await Transaction.aggregate([
        { $match: { userId: mongoose.Types.ObjectId(id), coinId } },
        { $group: { _id: null, value: { $sum: "$amount" } } }
      ]);

      const totalCost = await Transaction.aggregate([
        { $match: { userId: mongoose.Types.ObjectId(id), coinId } },
        { $group: { _id: null, value: { $sum: "$price" } } }
      ]);

      const myValue = quoteRes.quote.USD.price * totalAmount[0].value;

      result.push({
        name: quoteRes.name,
        price: quoteRes.quote.USD.price,
        change24h: quoteRes.quote.USD.percent_change_24h,
        totalAmount: totalAmount[0].value,
        totalCost: totalCost[0].value,
        myValue,
        profit: myValue - totalCost[0].value
      });
    });

    const sortedResult = result.sort((a, b) => b.price - a.price);

    ctx.status = 200;
    ctx.body = sortedResult;
  });

  router.get("/api/portfolio/stats", withAuth, async ctx => {
    const { id } = ctx.state.user;

    const result = {
      currentValue: 0,
      change24h: {
        value: 0,
        percent: 0
      },
      totalCost: 0,
      totalProfit: 0
    };

    const coinIds = await Transaction.find({ userId: id }).distinct("coinId");
    await asyncForEach(coinIds, async coinId => {
      const quoteRes = await getQuote(coinId);

      const totalAmount = await Transaction.aggregate([
        { $match: { userId: mongoose.Types.ObjectId(id), coinId } },
        { $group: { _id: null, value: { $sum: "$amount" } } }
      ]);

      const totalCost = await Transaction.aggregate([
        { $match: { userId: mongoose.Types.ObjectId(id), coinId } },
        { $group: { _id: null, value: { $sum: "$price" } } }
      ]);

      const myValue = quoteRes.quote.USD.price * totalAmount[0].value;
      const change24hValue = myValue * quoteRes.quote.USD.percent_change_24h;

      result.currentValue += myValue;
      result.totalCost += totalCost[0].value;
      result.totalProfit += myValue - totalCost[0].value;
      result.change24h.value += change24hValue;
    });

    result.change24h.percent = (result.change24h.value * 100) / result.currentValue;

    ctx.status = 200;
    ctx.body = result;
  });
};
