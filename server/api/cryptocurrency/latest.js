const getLatest = require("../coinmarketcap/latest");

exports.init = router => router.get("/api/cryptocurrency/latest", async ctx => {
  const { start, limit } = ctx.request.query;

  const res = await getLatest(start, limit);

  ctx.status = 200;
  ctx.body = res;
});
