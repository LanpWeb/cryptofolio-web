require("dotenv").config();

const path = require("path");
const next = require("next");
const mongoose = require("mongoose");

const { app, router } = require("./server.js");
const config = require("./config/default");

// Next
const dev = process.env.NODE_ENV !== "server-dev"
  && process.env.NODE_ENV !== "server-prod";
const n = next({ dev });

// next-routes
const routes = require("./routes");

const handler = routes.getRequestHandler(n);

n.prepare().then(() => {
  router.get("/service-worker.js", async ctx => {
    const filePath = path.join(__dirname, "../.next", "/service-worker.js");
    console.log(filePath);
    n.serveStatic(ctx.req, ctx.res, filePath);
    ctx.status = 200;
    ctx.respond = false;
  });

  router.get("*", async ctx => {
    await handler(ctx.req, ctx.res);
    ctx.status = 200;
    ctx.respond = false;
  });

  mongoose.connect(
    config.mongodbUrl,
    {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    }
  );

  mongoose.connection.once("open", () => {
    console.log("> Connected to MongoDB");
  });

  app.listen(config.port, () => {
    console.log(`> Listening on port : ${config.port}`);
    console.log(`> Env : ${process.env.NODE_ENV}`);
  });
});

module.exports = app;
