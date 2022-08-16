const asyncHandler = require("express-async-handler");
const Wallet = require("../models/walletModel");
const getUserTransactions = asyncHandler(async (req, res) => {
  const transactions = await Wallet.find({ userId: req.user.id });
  res.status(200).json(transactions);
});
const createNewTransaction = asyncHandler(async (req, res) => {
  const { desc, amount, transType } = req.body;

  if (!desc || !amount || !transType) {
    res.status(400);
    throw new Error("All Fields Must be fill");
  }
  const transaction = await Wallet.create({
    userId: req.user.id,
    desc,
    amount,
    transType,
  });
  res.status(200).json(transaction);
});

module.exports = {
  getUserTransactions,
  createNewTransaction,
};
