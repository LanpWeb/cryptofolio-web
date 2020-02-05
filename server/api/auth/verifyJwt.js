const jwt = require("jsonwebtoken");

const config = require("../../config/default");

exports.init = router => router.post("/api/verify-jwt", async (ctx) => {
  const { accessToken } = ctx.request.body;

  const payload = jwt.verify(accessToken, config.accessTokenSecret, (err, decoded) => {
    if (err) {
      ctx.throw(err.message, 400);
    }
    return decoded;
  });

  ctx.status = 200;
  ctx.body = {
    ...payload,
    iat: undefined
  };
});
