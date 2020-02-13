const path = require("path");
const fs = require("fs");

// Koa
const Koa = require("koa");
const Router = require("koa-router");

const koaSwagger = require("koa2-swagger-ui");
const swaggerOptions = require("./config/swagger.js");

const app = new Koa({ proxy: true });
const router = new Router();

const handlers = fs.readdirSync(path.join(__dirname, "handlers")).sort();
handlers.forEach(handler => require(`./handlers/${handler}`).init(app));

// API
const authApi = fs.readdirSync(path.join(__dirname, "api/auth")).sort();
authApi.forEach(controller => require(`./api/auth/${controller}`).init(router));

const cryptocurrencyApi = fs.readdirSync(path.join(__dirname, "api/cryptocurrency")).sort();
cryptocurrencyApi.forEach(controller => require(`./api/cryptocurrency/${controller}`).init(router));

const coreApi = fs.readdirSync(path.join(__dirname, "api/core")).sort();
coreApi.forEach(controller => require(`./api/core/${controller}`).init(router));

// Swagger
router.get("/api-docs", koaSwagger({ routePrefix: false, swaggerOptions }));

app.use(router.routes());

module.exports = { app, router };
