const mongoose = require("mongoose");
const Transaction = require("../models/transactionModel");

const getTransactions = async (req, res) => {
  try {
    const user_id = req.user._id;
    const transactions = await Transaction.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createTransaction = async (req, res) => {
  const { type, item_id, qty, from_location, to_location, date, notes } = req.body;
  const user_id = req.user._id;

  let emptyFields = [];

  if (!type || !["inbound", "outbound", "movement"].includes(type)) emptyFields.push("type");
  if (!item_id) emptyFields.push("item_id");
  if (!qty) emptyFields.push("qty");

  if (type === "movement") {
    if (!from_location) emptyFields.push("from_location");
    if (!to_location) emptyFields.push("to_location");
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: "Please fill in all required fields", emptyFields });
  }

  if (!mongoose.Types.ObjectId.isValid(item_id)) {
    return res.status(400).json({ error: "Invalid item ID" });
  }
  if (type === "movement") {
    if (!mongoose.Types.ObjectId.isValid(from_location)) {
      return res.status(400).json({ error: "Invalid from_location ID" });
    }
    if (!mongoose.Types.ObjectId.isValid(to_location)) {
      return res.status(400).json({ error: "Invalid to_location ID" });
    }
  }

  try {
    const transaction = await Transaction.create({
      type,
      item_id,
      qty,
      from_location: type === "movement" ? from_location : null,
      to_location: type === "movement" ? to_location : null,
      date: date || new Date(),
      notes: notes || "",
      user_id,
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteTransaction = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid transaction ID" });
  }

  try {
    const transaction = await Transaction.findByIdAndDelete(id);
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.status(200).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getTransactions,
  createTransaction,
  deleteTransaction,
};
