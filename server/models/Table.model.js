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
  
});

export default mongoose.model("Table", TableSchema);
