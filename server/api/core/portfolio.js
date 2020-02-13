const withAuth = require("../../middleware/withAuth");

const Transaction = require("../../models/transactions");

const asyncForEach = require("../../utils/asyncForEach");

const getQuote = require("../coinmarketcap/quote");

exports.init = router => {
  router.get("/api/portfolio/holdings", withAuth, async ctx => {
    const { id } = ctx.state.user;

    const result = [];

    const coins = await Transaction.find({ userId: id }).distinct("coin");
    await asyncForEach(coins, async coin => {
      const quoteRes = await getQuote(coin);

      const totalAmount = await Transaction.aggregate([
        { $match: { coin } },
        { $group: { _id: null, value: { $sum: "$amount" } } }
      ]);

      const totalCost = await Transaction.aggregate([
        { $match: { coin } },
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
      change24h: 0,
      totalCost: 0,
      totalProfit: 0
    };

    const coins = await Transaction.find({ userId: id }).distinct("coin");
    await asyncForEach(coins, async coin => {
      const quoteRes = await getQuote(coin);

      const totalAmount = await Transaction.aggregate([
        { $match: { coin } },
        { $group: { _id: null, value: { $sum: "$amount" } } }
      ]);

      const totalCost = await Transaction.aggregate([
        { $match: { coin } },
        { $group: { _id: null, value: { $sum: "$price" } } }
      ]);

      const myValue = quoteRes.quote.USD.price * totalAmount[0].value;

      result.currentValue += myValue;
      result.totalCost += totalCost[0].value;
      result.totalProfit += myValue - totalCost[0].value;
      result.change24h += myValue * quoteRes.quote.USD.percent_change_24h;
    });

    ctx.status = 200;
    ctx.body = result;
  });
};
