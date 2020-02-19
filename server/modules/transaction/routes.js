const compose = require("koa-compose");

const UserMiddleware = require("../user/middlewares");
const TransactionValidator = require("./validators");
const TransactionController = require("./controllers");

exports.init = router => {
  router.get("/api/transactions", UserMiddleware.withAuth, TransactionController.getTransactions);
  router.post("/api/transactions", compose([UserMiddleware.withAuth, TransactionValidator.createTransaction]), TransactionController.createTransaction);
  router.put("/api/transactions/:transactionId", compose([UserMiddleware.withAuth, TransactionValidator.editTransaction]), TransactionController.editTransaction);
  router.delete("/api/transactions/:transactionId", compose([UserMiddleware.withAuth, TransactionValidator.deleteTransaction]), TransactionController.deleteTransaction);

  router.get("/api/portfolio/stats", UserMiddleware.withAuth, TransactionController.getStats);
  router.get("/api/portfolio/holdings", UserMiddleware.withAuth, TransactionController.getHoldings);
  router.get("/api/portfolio/graph", UserMiddleware.withAuth, TransactionController.getGraph);
};
