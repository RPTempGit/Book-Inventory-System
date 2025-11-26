const Transaction = require("../models/transactionModel")
const { v4: uuidv4 } = require("uuid") 

const getTransactions = async (req, res) => {
  const user_id = req.user._id

  try {
    const transactions = await Transaction.find({ user_id }).sort({ date: -1 })
    res.status(200).json(transactions)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch transactions" })
  }
}

const createTransaction = async (req, res) => {
  const { type, item_name, qty, from_location, to_location, date } = req.body
  const user_id = req.user._id

  if (!type || !item_name || !qty) {
    return res.status(400).json({ error: "Type, item name, and quantity are required" })
  }

  try {
    const transaction = await Transaction.create({
      type,
      item_name,
      item_id: uuidv4(), // generate random item_id
      qty,
      from_location: from_location || null,
      to_location: to_location || null,
      date: date || new Date(),
      user_id
    })

    res.status(201).json(transaction)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const deleteTransaction = async (req, res) => {
  const { id } = req.params
  const user_id = req.user._id

  try {
    const transaction = await Transaction.findOneAndDelete({ _id: id, user_id })
    if (!transaction) return res.status(404).json({ error: "Transaction not found" })

    res.status(200).json(transaction)
  } catch (error) {
    res.status(400).json({ error: "Failed to delete transaction" })
  }
}

module.exports = {
  getTransactions,
  createTransaction,
  deleteTransaction
}
