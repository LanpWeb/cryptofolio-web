exports.init = router => router.get("/api/test", async ctx => {
  ctx.status = 200;

  ctx.body = {
    test: true
  };
});
