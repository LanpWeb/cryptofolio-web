const getGlobalStats = require("../coinmarketcap/globalStats");

exports.init = router => router.get("/api/cryptocurrency/global-stats", async ctx => {
  const res = await getGlobalStats();

  ctx.status = 200;
  ctx.body = res;
});
