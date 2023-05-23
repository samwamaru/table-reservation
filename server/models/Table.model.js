import mongoose from "mongoose";

const TableSchema = new mongoose.Schema({
  tableNumber: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant", // If you decide to include the Restaurant model in the future
    required: true,
  },
});

export default mongoose.model("Table", TableSchema);
