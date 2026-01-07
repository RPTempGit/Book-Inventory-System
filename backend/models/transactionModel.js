
import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["inbound", "outbound", "movement"],
      required: true,
    },
    item_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
    qty: {
      type: Number,
      required: true,
    },
    from_location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
    },
    to_location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
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
    notes: String,
  },
  { timestamps: true }
);


export default mongoose.model("Transaction", transactionSchema);
