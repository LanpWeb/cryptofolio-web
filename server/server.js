const path = require("path");
const fs = require("fs");

// Koa
const Koa = require("koa");
const Router = require("koa-router");

const app = new Koa({ proxy: true });
const router = new Router();

const handlers = fs.readdirSync(path.join(__dirname, "handlers")).sort();
handlers.forEach(handler => require(`./handlers/${handler}`).init(app));

const authHandlers = fs.readdirSync(path.join(__dirname, "api/auth")).sort();
authHandlers.forEach(handler => require(`./api/auth/${handler}`).init(router));

const cryptocurrencyHandlers = fs.readdirSync(path.join(__dirname, "api/cryptocurrency")).sort();
cryptocurrencyHandlers.forEach(handler => require(`./api/cryptocurrency/${handler}`).init(router));

app.use(router.routes());

module.exports = { app, router };
