const CryptocurrencyService = require("./services");

// exports.getGraph = async ctx => {
//   const { coinId, period } = ctx.request.query;

//   try {
//     const res = await CryptocurrencyService.getHistoricQuotes(coinId, period);

//     ctx.status = 200;
//     ctx.body = res;
//   } catch (err) {
//     ctx.throw(err.message, 400);
//   }
// };

exports.getInfo = async ctx => {
  const { slug } = ctx.params;

  try {
    const infoRes = await CryptocurrencyService.getInfo(slug);
    const priceRes = await CryptocurrencyService.getPriceStats(infoRes.id);
    const quoteRes = await CryptocurrencyService.getQuote(infoRes.id);
    const graphRes = await CryptocurrencyService.getHistoricQuotes(infoRes.id);

    ctx.status = 200;
    ctx.body = {
      ...infoRes, ...quoteRes, pricePeriods: priceRes.periods, graph: graphRes.quotes
    };
  } catch (err) {
    ctx.throw(err.message, 400);
  }
};

exports.getLatest = async ctx => {
  const { start, limit } = ctx.request.query;

  try {
    const res = await CryptocurrencyService.getLatest(start, limit);

    ctx.status = 200;
    ctx.body = res;
  } catch (err) {
    ctx.throw(err.message, 400);
  }
};

exports.getMap = async ctx => {
  try {
    const res = await CryptocurrencyService.getMap();

    ctx.status = 200;
    ctx.body = res;
  } catch (err) {
    ctx.throw(err.message, 400);
  }
};

exports.getGlobalStats = async ctx => {
  try {
    const res = await CryptocurrencyService.getGlobalStats();

    ctx.status = 200;
    ctx.body = res;
  } catch (err) {
    ctx.throw(err.message, 400);
  }
};
