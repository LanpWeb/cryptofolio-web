const getGlobalStats = require("../coinmarketcap/globalStats");

exports.init = router => router.get("/api/cryptocurrency/global-stats", async ctx => {
  const res = await getGlobalStats();

  const volume24 = res.quote.USD.total_volume_24h;
  const marketCap = res.quote.USD.total_market_cap;
  const btcDominance = res.btc_dominance;

  const statistics = {
    marketCap, volume24, btcDominance
  };

  ctx.status = 200;
  ctx.body = statistics;
});
