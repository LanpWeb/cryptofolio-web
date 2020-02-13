const withAuth = require("../../middleware/withAuth");

exports.init = router => router.get("/api/user", withAuth, async ctx => {
  const { id, email, watchlist } = ctx.state.user;

  ctx.status = 200;
  ctx.body = {
    id,
    email,
    watchlist
  };
});
