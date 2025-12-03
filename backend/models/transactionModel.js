const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["inbound", "outbound", "movement"],
      required: true,
    },
    item_name: {
      type: String,
      required: true,
    },
    qty: {
      type: Number,
      required: true,
    },
    from_location: {
      type: String, 
    },
    to_location: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    notes: {
      type: String, 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
