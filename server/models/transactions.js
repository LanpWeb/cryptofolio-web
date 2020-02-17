const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: {
    type: String,
    enum: ["purchase", "sale"],
    default: "purchase"
  },
  coinId: Number,
  amount: Number,
  price: Number,
  date: Number
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
