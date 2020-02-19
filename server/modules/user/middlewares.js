const jwt = require("jsonwebtoken");

const config = require("../../config/default");

const UserService = require("./services");

exports.withAuth = async (ctx, next) => {
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

  try {
    const user = await UserService.getUserById(userId);
    if (!user) {
      ctx.throw("Malformed authorization header.", 403);
    } else {
      ctx.state.user = user;
    }
  } catch (err) {
    ctx.throw(err.message, 403);
  }

  await next();
};

exports.withCookie = async (ctx, next) => {
  const refreshToken = ctx.cookies.get("refreshToken");

  if (!refreshToken) {
    ctx.throw("Required authorization refresh token.", 400);
  }

  const payload = jwt.verify(refreshToken, config.refreshTokenSecret, (err, decoded) => {
    if (err) {
      ctx.throw(err.message, 400);
    }
    return decoded;
  });

  const { userId } = payload;
  if (!userId) {
    ctx.throw("Malformed refresh token.", 400);
  }

  try {
    const user = await UserService.getUserById(userId);
    if (!user) {
      ctx.throw("Malformed refresh header.", 400);
    } else {
      ctx.state.user = user;
    }
  } catch (err) {
    ctx.throw(err.message, 400);
  }

  await next();
};
