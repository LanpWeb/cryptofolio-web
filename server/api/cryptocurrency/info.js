const getInfo = require("../coinmarketcap/info");
const getQuote = require("../coinmarketcap/quote");
const getPriceStats = require("../coinmarketcap/priceStats");

exports.init = router => router.get("/api/cryptocurrency/info/:slug", async ctx => {
  const { slug } = ctx.params;

  const infoRes = await getInfo(slug);
  const priceRes = await getPriceStats(infoRes.id);
  const quoteRes = await getQuote(infoRes.id);

  ctx.status = 200;
  ctx.body = { ...infoRes, ...quoteRes, pricePeriods: priceRes.periods };
});
