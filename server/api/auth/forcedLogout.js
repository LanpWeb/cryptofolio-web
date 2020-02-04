const jwt = require("jsonwebtoken");

const User = require("../../models/users");
const config = require("../../config/default");

exports.init = router => router.post("/api/forced-logout", async ctx => {
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

  if (!user) {
    ctx.throw("There is no user.", 400);
  }

  await User.findByIdAndUpdate(userId, { refreshTokens: [] });

  ctx.cookies.set("refreshToken", null);
  ctx.status = 200;
});
