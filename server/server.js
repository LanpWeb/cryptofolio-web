const path = require("path");
const fs = require("fs");

// Koa
const Koa = require("koa");
const Router = require("koa-router");

const app = new Koa();
const router = new Router();

const handlers = fs.readdirSync(path.join(__dirname, "handlers")).sort();
handlers.forEach(handler => require(`./handlers/${handler}`).init(app));

const apiHandlers = fs.readdirSync(path.join(__dirname, "api")).sort();
apiHandlers.forEach(handler => require(`./api/${handler}`).init(router));

app.use(router.routes());

module.exports = { app, router };
