// add new variables for development

module.exports = {
  root: process.cwd(),
  host: "localhost",
  port: process.env.NODE_ENV === "server-prod" ? process.env.PORT : 3004,
  coinMarketCapKey: "a1f21727-ebae-4162-8b50-4683e5fb1608",
  mongodbUrl: "mongodb+srv://admin:5EcJKOpUY3ZjTW61@cluster0-hbaof.mongodb.net/cryptofolio?retryWrites=true&w=majority",
  accessTokenSecret: "cvE4DeMEVN5xsVKagPiIDWytZ27eUEsZ",
  refreshTokenSecret: "eM6muLdE5UxHBi2jOHYQEUUoAHlD2ELp",
  refreshTokenCookie: {
    sameSite: true,
    overwrite: true,
    secure: false,
    maxAge: 60 * 60 * 24 * 60 * 1000,
    httpOnly: true
  }
};
