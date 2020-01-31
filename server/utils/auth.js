const jwt = require("jsonwebtoken");

const config = require("../config/default");

const createAccessToken = userId => {
  const token = jwt.sign(
    {
      userId
    },
    config.ACCESS_TOKEN_SECRET,
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
    config.REFRESH_TOKEN_SECRET,
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
