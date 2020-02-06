const jwt = require("jsonwebtoken");

const User = require("../models/users");
const config = require("../config/default");

module.exports = async (ctx, next) => {
  if (!ctx.headers.authorization) {
    ctx.throw(403, "Required authorization token.");
  }

  const authSplit = ctx.headers.authorization.split(" ");

  if (authSplit[0] !== "Bearer" || !authSplit[1]) {
    ctx.throw(403, "Malformed authorization header.");
  }

  const accessToken = authSplit[1];

  const payload = jwt.verify(accessToken, config.accessTokenSecret, (err, decoded) => {
    if (err) {
      ctx.throw(err.message, 403);
    }
    return decoded;
  });

  const { userId } = payload;
  if (!userId) {
    ctx.throw("Malformed authorization header.", 403);
  }

  const user = await User.findById(userId);
  if (!user) {
    ctx.throw("Malformed authorization header.", 403);
  }

  ctx.state.user = user;

  await next();
};
