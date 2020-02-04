exports.init = router => router.post("/api/logout", async ctx => {
  ctx.cookies.set("refreshToken", null);
  ctx.status = 200;
});
