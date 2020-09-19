import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  naziv: {
    type: String,
    required: true,
  },
  cena: {
    type: Number,
    required: true,
  },
  jedinicaMere: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Product", ProductSchema);
