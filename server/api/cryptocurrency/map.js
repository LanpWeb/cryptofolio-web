const getMap = require("../coinmarketcap/map");

exports.init = router => router.get("/api/cryptocurrency/map", async ctx => {
  const res = await getMap();

  ctx.status = 200;
  ctx.body = res;
});
