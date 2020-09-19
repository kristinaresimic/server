import mongoose from "mongoose";

const SupplierSchema = new mongoose.Schema({
  naziv: {
    type: String,
    required: true,
  },
  adresa: {
    type: String,
    required: true,
  },
  mesto: {
    type: String,
  },
});

export default mongoose.model("Supplier", SupplierSchema);
