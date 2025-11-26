const Transaction = require("../models/transactionModel")
const mongoose = require("mongoose")

const createTransaction = async (req, res) => {
  const { type, item_id, qty, from_location, to_location, date } = req.body

  if (!type || !item_id || !qty || !date) {
    return res.status(400).json({ error: "Missing required fields" })
  }

  try {
    const transaction = await Transaction.create({
      type,
      item_id: mongoose.Types.ObjectId(item_id),
      qty,
      from_location: from_location ? mongoose.Types.ObjectId(from_location) : null,
      to_location: to_location ? mongoose.Types.ObjectId(to_location) : null,
      date: new Date(date),
      user_id: mongoose.Types.ObjectId(req.user._id)
    })
    res.status(200).json(transaction)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const getTransactions = async (req, res) => {
  const transactions = await Transaction.find({ user_id: req.user._id })
    .sort({ date: -1 })
    .populate("item_id")
    .populate("from_location")
    .populate("to_location")
  res.status(200).json(transactions)
}

module.exports = { createTransaction, getTransactions }
