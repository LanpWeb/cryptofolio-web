const withAuth = require("../../middleware/withAuth");

const Transaction = require("../../models/transactions");

exports.init = router => {
  router.get("/api/transactions", withAuth, async ctx => {
    const { id } = ctx.state.user;
    const { start, limit } = ctx.request.query;

    const options = {
      skip: parseInt(start, 10) || 0,
      limit: parseInt(limit, 10) || 10
    };

    const transactions = await Transaction.find({ userId: id }, null, options);

    ctx.status = 200;
    ctx.body = transactions;
  });

  router.post("/api/transactions", withAuth, async ctx => {
    const { id } = ctx.state.user;
    const {
      type, coin, amount, price, date
    } = ctx.request.body;

    if (type.length === 0) {
      ctx.throw("Transaction type is empty.", 400);
    }

    if (type !== "purchase" && type !== "sale") {
      ctx.throw("Transaction type is invalid.", 400);
    }

    if (coin.length === 0) {
      ctx.throw("Coin is empty.", 400);
    }

    if (!amount) {
      ctx.throw("Coin amount is empty.", 400);
    }

    if (type === "sale") {
      const totalAmount = await Transaction.aggregate([
        { $match: { coin } },
        { $group: { _id: null, value: { $sum: "$amount" } } }
      ]);

      if (totalAmount[0].value < amount) {
        ctx.throw("Amount of selling coins are greater than existing.", 400);
      }
    }

    if (!price) {
      ctx.throw("Transaction price is empty.", 400);
    }

    if (date.length === 0) {
      ctx.throw("Transaction date is empty.", 400);
    }

    await Transaction.create({
      userId: id,
      amount: type === "sale" ? -amount : amount,
      price: type === "sale" ? -price : price,
      type,
      coin,
      date
    });

    ctx.status = 200;
  });

  router.put("/api/transactions/:transactionId", withAuth, async ctx => {
    const { id } = ctx.state.user;
    const { transactionId } = ctx.params;
    const {
      type, coin, amount, price, date
    } = ctx.request.body;

    if (transactionId.length === 0) {
      ctx.throw("Transaction id is empty.", 400);
    }

    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      ctx.throw("Transaction does not exists.", 400);
    }

    if (!transaction.userId.equals(id)) {
      ctx.throw("Malformed authorization header.", 400);
    }

    if (type.length === 0) {
      ctx.throw("Transaction type is empty.", 400);
    }

    if (type !== "purchase" && type !== "sale") {
      ctx.throw("Transaction type is invalid.", 400);
    }

    if (coin.length === 0) {
      ctx.throw("Coin is empty.", 400);
    }

    if (!amount) {
      ctx.throw("Coin amount is empty.", 400);
    }

    if (type === "sale") {
      const totalAmount = await Transaction.aggregate([
        { $match: { coin } },
        { $group: { _id: null, value: { $sum: "$amount" } } }
      ]);

      if (totalAmount[0].value < amount) {
        ctx.throw("Amount of selling coins are greater than existing.", 400);
      }
    }

    if (!price) {
      ctx.throw("Transaction price is empty.", 400);
    }

    if (date.length === 0) {
      ctx.throw("Transaction date is empty.", 400);
    }

    await Transaction.findByIdAndUpdate(transactionId, {
      amount: type === "sale" ? -amount : amount,
      price: type === "sale" ? -price : price,
      type,
      coin,
      date
    });

    ctx.status = 200;
  });

  router.delete("/api/transactions/:transactionId", withAuth, async ctx => {
    const { id } = ctx.state.user;
    const { transactionId } = ctx.params;

    if (transactionId.length === 0) {
      ctx.throw("Transaction id is empty.", 400);
    }

    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      ctx.throw("Transaction does not exists.", 400);
    }

    if (!transaction.userId.equals(id)) {
      ctx.throw("Malformed authorization header.", 400);
    }

    await Transaction.findOneAndDelete(transactionId);

    ctx.status = 200;
  });
};
