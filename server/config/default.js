// add new variables for development

module.exports = {
  root: process.cwd(),
  host: 'localhost',
  port: process.env.NODE_ENV === 'server-prod' ? process.env.PORT : 3004,
  coinMarketCapKey: process.env.COINMARKETCAP_KEY,
  coinMarketCapUrl: process.env.COINMARKETCAP_URL,
  mongodbUrl: process.env.MONGODB_URL,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  refreshTokenCookie: {
    sameSite: true,
    overwrite: true,
    secure: process.env.NODE_ENV === 'server-prod',
    maxAge: 60 * 60 * 24 * 60 * 1000,
    httpOnly: true,
  },
}
