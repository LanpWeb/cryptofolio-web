const User = require("../models/users");

const { createAccessToken, createRefreshToken } = require("../utils/auth");

exports.init = router => router.post("/api/sign-in", async ctx => {
  const { email, password } = ctx.request.body;

  const user = await User.findOne({ email });

  if (!user) {
    ctx.throw("No user exists with such email.", 400);
  }

  if (!await user.matchesPassword(password)) {
    ctx.throw("Incorrect password. Please try again.", 400);
  }

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
