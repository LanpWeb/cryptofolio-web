const getHistoricQuotes = require("../coinmarketcap/historicQuotes");

exports.init = router => router.get("/api/cryptocurrency/graph", async ctx => {
  const { coinId, period } = ctx.request.query;

  const res = await getHistoricQuotes(coinId, period);

  ctx.status = 200;
  ctx.body = res;
});
