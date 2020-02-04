// add new variables for development

module.exports = {
  host: "localhost",
  port: 3004,
  root: process.cwd(),
  mongodbURL: "mongodb+srv://admin:5EcJKOpUY3ZjTW61@cluster0-hbaof.mongodb.net/test?retryWrites=true&w=majority",
  ACCESS_TOKEN_SECRET: "eww78273ueuiw",
  REFRESH_TOKEN_SECRET: "sdiudsjjds32wiosioaew",
  refreshTokenCookie: {
    sameSite: true,
    overwrite: true,
    secure: false,
    maxAge: 60 * 60 * 24 * 60 * 1000,
    httpOnly: true
  }
};
