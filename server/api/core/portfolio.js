const withAuth = require("../../middleware/withAuth");

exports.init = router => router.get("/api/portfolio", withAuth, async ctx => {
  ctx.status = 200;
});
