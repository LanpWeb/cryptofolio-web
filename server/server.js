const path = require("path");
const fs = require("fs");

const mongoose = require("mongoose");

// Koa
const Koa = require("koa");
const Router = require("koa-router");

const koaSwagger = require("koa2-swagger-ui");
const swaggerOptions = require("./config/swagger.js");

const config = require("./config/default");

// next-routes
const routes = require("./routes");

module.exports = nextApp => {
  const server = new Koa({ proxy: true });
  const handler = routes.getRequestHandler(nextApp);
  const rootRouter = new Router();

  // Initialize handlers
  const handlers = fs.readdirSync(path.join(__dirname, "handlers")).sort();
  handlers.forEach(handlerName => require(`./handlers/${handlerName}`).init(server));

  // Initialize API
  const modules = fs.readdirSync(path.join(__dirname, "modules")).sort();
  modules.forEach(moduleName => require(`./modules/${moduleName}/routes`).init(rootRouter));

  // Swagger route
  rootRouter.get("/api-docs", koaSwagger({ routePrefix: false, swaggerOptions }));

  // Service worker route
  rootRouter.get("/service-worker.js", async ctx => {
    const filePath = path.join(__dirname, "../.next", "/service-worker.js");
    console.log(filePath);
    nextApp.serveStatic(ctx.req, ctx.res, filePath);
    ctx.status = 200;
    ctx.respond = false;
  });

  // For another routes
  rootRouter.get("*", async ctx => {
    await handler(ctx.req, ctx.res);
    ctx.status = 200;
    ctx.respond = false;
  });

  // MongoDB connection
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

  server.use(rootRouter.routes());
  server.listen(config.port, () => {
    console.log(`> Listening on port : ${config.port}`);
    console.log(`> Env : ${process.env.NODE_ENV}`);
  });
};
