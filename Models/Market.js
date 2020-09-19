import mongoose from "mongoose";

const MarketSchema = new mongoose.Schema({
  naziv: {
    type: String,
    required: true,
  },
  grad: {
    type: String,
    required: true,
  },
  adresa: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Market", MarketSchema);
