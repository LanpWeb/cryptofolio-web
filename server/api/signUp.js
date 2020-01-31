const User = require("../models/users");

const { createAccessToken, createRefreshToken } = require("../utils/auth");

exports.init = router => router.post("/api/sign-up", async ctx => {
  const { email, password } = ctx.request.body;

  if (await User.where({ email }).countDocuments() !== 0) {
    ctx.throw("Email has already been taken.", 400);
  }

  const user = await User.create({ email, password });

  const refreshToken = createRefreshToken(user.id);
  await User.findByIdAndUpdate(user.id, { refreshToken });

  ctx.cookies.set("rjwt", refreshToken, {
    httpOnly: true
  });
  ctx.status = 200;
  ctx.body = {
    accessToken: createAccessToken(user.id)
  };
});
