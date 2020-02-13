const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: {
    type: String,
    enum: ["purchase", "sale"],
    default: "purchase"
  },
  coin: String,
  amount: Number,
  price: Number,
  date: String
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
