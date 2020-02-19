const mongoose = require("mongoose");

const Transaction = require("./model");

exports.getTransactionById = async transactionId => {
  try {
    const transaction = await Transaction.findById(transactionId);
    return transaction;
  } catch (err) {
    throw Error("Error while quering transaction.");
  }
};

exports.getTransactions = async (userId, options) => {
  try {
    const transaction = await Transaction.find({ userId }, null, options);
    return transaction;
  } catch (err) {
    throw Error("Error while quering transactions.");
  }
};

exports.getTotalCoins = async (userId, coin, transactionId) => {
  try {
    const totalAmount = await Transaction.aggregate([
      { $match: { _id: { $ne: mongoose.Types.ObjectId(transactionId) }, userId: mongoose.Types.ObjectId(userId), coin } },
      { $group: { _id: null, value: { $sum: "$amount" } } }
    ]);
    return totalAmount;
  } catch (err) {
    throw Error("Error while quering total amount of coins.");
  }
};

exports.create = async (userId, type, amount, price, coin, date) => {
  if (!(date >= 1566086400 && date <= 1567123200)) {
    throw new Error("Date should be in timestamp range [1566086400, 1567123200].");
  }

  try {
    await Transaction.create({
      userId,
      amount: type === "sale" ? -amount : amount,
      price: type === "sale" ? -price : price,
      type,
      coin,
      date
    });
  } catch (err) {
    throw Error("Error while creating transaction.");
  }
};

exports.edit = async (transactionId, type, amount, price, coin, date) => {
  if (!(date >= 1566086400 && date <= 1567123200)) {
    throw new Error("Date should be in timestamp range [1566086400, 1567123200].");
  }

  try {
    await Transaction.findByIdAndUpdate(transactionId, {
      amount: type === "sale" ? -amount : amount,
      price: type === "sale" ? -price : price,
      type,
      coin,
      date
    });
  } catch (err) {
    throw Error("Error while editing transaction.");
  }
};

exports.delete = async transactionId => {
  try {
    await Transaction.findOneAndDelete(transactionId);
  } catch (err) {
    throw Error("Error while deleting transaction.");
  }
};

exports.getAllTransactionsDates = async userId => {
  try {
    const dates = await Transaction.find({ userId }).distinct("date");
    return dates;
  } catch (err) {
    throw Error("Error while quering all transactions dates.");
  }
};

exports.getAllTransactionsCoins = async userId => {
  try {
    const coins = await Transaction.find({ userId }).distinct("coin");
    return coins;
  } catch (err) {
    throw Error("Error while quering all transactions coins.");
  }
};

exports.getTransactionsByDate = async (userId, date) => {
  try {
    const transactions = await Transaction.find({ userId, date });
    return transactions;
  } catch (err) {
    throw Error("Error while quering transactions by date.");
  }
};

exports.getTotalInfo = async (userId, coin) => {
  try {
    const totalAmount = await Transaction.aggregate([
      { $match: { userId: mongoose.Types.ObjectId(userId), coin } },
      { $group: { _id: null, value: { $sum: "$amount" } } }
    ]);

    const totalCost = await Transaction.aggregate([
      { $match: { userId: mongoose.Types.ObjectId(userId), coin } },
      { $group: { _id: null, value: { $sum: "$price" } } }
    ]);

    return { totalAmount, totalCost };
  } catch (err) {
    throw Error("Error while getting total amount of coins and total cost.");
  }
};
