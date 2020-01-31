const jwt = require("jsonwebtoken");

const User = require("../models/users");
const config = require("../config/default");

const { createAccessToken, createRefreshToken } = require("../utils/auth");

exports.init = router => router.post("/api/refresh-token", async ctx => {
  const refreshToken = ctx.cookies.get("rjwt");

  if (!refreshToken) {
    ctx.status = 200;
    ctx.body = {
      accessToken: ""
    };
    return;
  }

  const userId = jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return;
    }
    return decoded;
  });

  if (!userId) {
    ctx.status = 200;
    ctx.body = {
      accessToken: ""
    };
    return;
  }
  const user = await User.findOne({ id: userId });

  if (!user || user.refreshToken !== refreshToken) {
    ctx.status = 200;
    ctx.body = {
      accessToken: ""
    };
    return;
  }

  const newRefreshToken = createRefreshToken(user.id);
  await User.findByIdAndUpdate(userId, { refreshToken });

  ctx.cookies.set("rjwt", newRefreshToken, {
    httpOnly: true
  });
  ctx.status = 200;
  ctx.body = {
    accessToken: createAccessToken(userId)
  };
});
