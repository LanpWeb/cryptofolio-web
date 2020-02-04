const EmailValidator = require("email-validator");

const User = require("../../models/users");

const config = require("../../config/default");

const { createAccessToken, createRefreshToken } = require("../../utils/auth");

exports.init = router => router.post("/api/sign-in", async ctx => {
  const { email, password } = ctx.request.body;

  if (email.length === 0) {
    ctx.throw("Email field is empty.", 400);
  }

  if (!EmailValidator.validate(email)) {
    ctx.throw("Email is not valid.", 400);
  }

  const user = await User.findOne({ email });

  if (!user) {
    ctx.throw("No user exists with such email.", 400);
  }

  if (password.length === 0) {
    ctx.throw("Password field is empty.", 400);
  }

  if (!await user.matchesPassword(password)) {
    ctx.throw("Incorrect password. Please try again.", 400);
  }

  const refreshToken = createRefreshToken(user.id);
  await User.findByIdAndUpdate(user.id, { $push: { refreshTokens: refreshToken } });

  ctx.cookies.set("refreshToken", refreshToken, config.refreshTokenCookie);
  ctx.status = 200;
  ctx.body = {
    accessToken: createAccessToken(user.id)
  };
});
