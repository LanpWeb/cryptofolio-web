// request/response logger
const logger = require("koa-logger");

exports.init = app => {
  if (process.env.NODE_ENV !== "test") {
    app.use(logger());
  }
};
