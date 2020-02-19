const compose = require("koa-compose");

const UserMiddleware = require("./middlewares");
const UserValidator = require("./validators");
const UserController = require("./controllers");

exports.init = router => {
  router.post("/api/sign-in", UserValidator.signIn, UserController.signIn);
  router.post("/api/sign-up", UserValidator.signUp, UserController.signUp);

  router.post("/api/logout", UserMiddleware.withCookie, UserController.logout);
  router.post("/api/forced-logout", UserMiddleware.withCookie, UserController.forcedLogout);
  router.post("/api/devices-logout", UserMiddleware.withCookie, UserController.devicesLogout);

  router.post("/api/verify-jwt", UserController.verifyJwt);
  router.post("/api/refresh-token", UserMiddleware.withCookie, UserController.updateRefreshToken);

  router.get("/api/user", UserMiddleware.withAuth, UserController.getMe);

  router.get("/api/watchlist", UserMiddleware.withAuth, UserController.getWatchlist);
  router.post("/api/watchlist", UserMiddleware.withAuth, UserController.toggleWatchlist);

  router.post("/api/change-password", compose([UserMiddleware.withAuth, UserValidator.changePassword]), UserController.changePassword);
};
