const jwt = require("jsonwebtoken");

const config = require("../config/default");

module.exports = async (ctx, next) => {
  if (!ctx.headers.authorization) {
    ctx.throw(403, "Required authorization token.");
  }

  const authSplit = ctx.headers.authorization.split(" ")[1];

  if (authSplit[0] !== "Bearer" || !authSplit[1]) {
    ctx.throw(403, "Malformed authorization header.");
  }

  const accessToken = authSplit[1];

  const payload = jwt.verify(accessToken, config.accessTokenSecret, (err, decoded) => {
    if (err) {
      return;
    }
    return decoded;
  });

  if (!payload) {
    ctx.throw(403, "Authorization token failed verification.");
  }

  await next();
};
