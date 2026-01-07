const mongoose = require("mongoose");

const stockTakeSchema = new mongoose.Schema(
  {
    item_name: {
      type: String,
      required: true,
      trim: true,
    },
    qty: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      default: "",
    },
    notes: {
      type: String,
      default: "",
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("StockTake", stockTakeSchema);
