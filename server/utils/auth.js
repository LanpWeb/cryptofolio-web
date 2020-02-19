const jwt = require("jsonwebtoken");

const config = require("../config/default");

exports.createAccessToken = userId => {
  const token = jwt.sign({ userId }, config.accessTokenSecret, { expiresIn: "15m" });
  return token;
};

exports.createRefreshToken = userId => {
  const token = jwt.sign({ userId }, config.refreshTokenSecret, { expiresIn: "1d" });
  return token;
};
