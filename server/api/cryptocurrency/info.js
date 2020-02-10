const getInfo = require("../coinmarketcap/info");
const getQuotes = require("../coinmarketcap/quotes");
const getPriceStats = require("../coinmarketcap/priceStats");

exports.init = router => router.get("/api/cryptocurrency/info/:slug", async ctx => {
  const { slug } = ctx.params;

  const infoRes = await getInfo(slug);
  const quotesRes = await getQuotes(slug);
  const priceRes = await getPriceStats(slug);

  ctx.status = 200;
  ctx.body = { ...infoRes, ...quotesRes, pricePeriods: priceRes.periods };
});

// const open = new Date(priceRes.periods.all_time.quote.USD.open_timestamp).getTime();
// const close = new Date(priceRes.periods.all_time.quote.USD.close_timestamp).getTime();

// const requestOptionsGraph = {
//   method: "GET",
//   uri: "https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/quotes/historical",
//   qs: {
//     id: "1",
//     count: "2",
//     time_end: "2018-06-22T19:35:00"
//   },
//   headers: {
//     "X-CMC_PRO_API_KEY": config.coinMarketCapKey
//   },
//   json: true,
//   gzip: true
// };

// const resGraph = await rp(requestOptionsGraph);
// console.log(resGraph.data);
