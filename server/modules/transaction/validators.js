const TransactionService = require("./services");

exports.createTransaction = async (ctx, next) => {
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

  if (coin.id.length === 0) {
    ctx.throw("Coin id is empty.", 400);
  }

  if (coin.name.length === 0) {
    ctx.throw("Coin name is empty.", 400);
  }

  if (!amount) {
    ctx.throw("Coin amount is empty.", 400);
  }

  if (type === "sale") {
    try {
      const totalAmount = await TransactionService.getTotalCoins(id, coin, undefined);

      if (!totalAmount[0] || !totalAmount[0].value || totalAmount[0].value < amount) {
        ctx.throw("Amount of selling coins are greater than existing.", 400);
      }
    } catch (err) {
      ctx.throw(err.message, 400);
    }
  }

  if (!price) {
    ctx.throw("Transaction price is empty.", 400);
  }

  if (date.length === 0) {
    ctx.throw("Transaction date is empty.", 400);
  }

  await next();
};

exports.editTransaction = async (ctx, next) => {
  const { id } = ctx.state.user;
  const { transactionId } = ctx.params;
  const {
    type, coin, amount, price, date
  } = ctx.request.body;

  if (transactionId.length === 0) {
    ctx.throw("Transaction id is empty.", 400);
  }

  try {
    const transaction = await TransactionService.getTransactionById(transactionId);

    if (!transaction) {
      ctx.throw("Transaction does not exists.", 400);
    }

    if (!transaction.userId.equals(id)) {
      ctx.throw("Malformed authorization header.", 400);
    }
  } catch (err) {
    ctx.throw(err.message, 400);
  }

  if (type.length === 0) {
    ctx.throw("Transaction type is empty.", 400);
  }

  if (type !== "purchase" && type !== "sale") {
    ctx.throw("Transaction type is invalid.", 400);
  }

  if (coin.id.length === 0) {
    ctx.throw("Coin id is empty.", 400);
  }

  if (coin.name.length === 0) {
    ctx.throw("Coin name is empty.", 400);
  }

  if (!amount) {
    ctx.throw("Coin amount is empty.", 400);
  }

  if (type === "sale") {
    try {
      const totalAmount = await TransactionService.getTotalCoins(id, coin, transactionId);
      if (!totalAmount[0] || !totalAmount[0].value || totalAmount[0].value < amount) {
        ctx.throw("Amount of selling coins are greater than existing.", 400);
      }
    } catch (err) {
      ctx.throw(err.message, 400);
    }
  }

  if (!price) {
    ctx.throw("Transaction price is empty.", 400);
  }

  if (date.length === 0) {
    ctx.throw("Transaction date is empty.", 400);
  }

  await next();
};

exports.deleteTransaction = async (ctx, next) => {
  const { id } = ctx.state.user;
  const { transactionId } = ctx.params;

  if (transactionId.length === 0) {
    ctx.throw("Transaction id is empty.", 400);
  }

  try {
    const transaction = await TransactionService.getTransactionById(transactionId);
    if (!transaction) {
      ctx.throw("Transaction does not exists.", 400);
    }

    if (!transaction.userId.equals(id)) {
      ctx.throw("Malformed authorization header.", 400);
    }

    const totalAmount = await TransactionService.getTotalCoins(id, transaction.coin);
    if (!totalAmount[0] || !totalAmount[0].value || totalAmount[0].value < transaction.amount) {
      ctx.throw("Amount of deleting coins are greater than existing.", 400);
    }
  } catch (err) {
    ctx.throw(err.message, 400);
  }

  await next();
};
