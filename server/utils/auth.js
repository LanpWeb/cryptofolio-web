const jwt = require("jsonwebtoken");

const config = require("../config/default");

const createAccessToken = userId => {
  const token = jwt.sign(
    {
      userId
    },
    config.accessTokenSecret,
    {
      expiresIn: "15m"
    }
  );
  return token;
};

const createRefreshToken = userId => {
  const token = jwt.sign(
    {
      userId
    },
    config.refreshTokenSecret,
    {
      expiresIn: "1d"
    }
  );
  return token;
};

module.exports = {
  createAccessToken,
  createRefreshToken
};
