const jwt = require("jsonwebtoken");

const User = require("../../models/users");
const config = require("../../config/default");

const { createAccessToken, createRefreshToken } = require("../../utils/auth");

exports.init = router => router.post("/api/refresh-token", async ctx => {
  const refreshToken = ctx.cookies.get("refreshToken");

  if (!refreshToken) {
    ctx.throw("Required authorization refresh token.", 400);
  }

  const payload = jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      ctx.throw(err.message, 400);
    }
    return decoded;
  });

  const { userId } = payload;
  if (!userId) {
    ctx.throw("Malformed refresh token.", 400);
  }

  const user = await User.findById(userId);
  if (!user || user.refreshToken !== refreshToken) {
    ctx.throw("Malformed refresh token.", 400);
  }

  const newRefreshToken = createRefreshToken(userId);

  await User.findByIdAndUpdate(userId, { refreshToken: newRefreshToken });

  ctx.cookies.set("refreshToken", newRefreshToken, config.refreshTokenCookie);
  ctx.status = 200;
  ctx.body = {
    accessToken: createAccessToken(userId)
  };
});
