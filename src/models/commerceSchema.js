const mongoose = require("mongoose");
const commerceSchema = new mongoose.Schema({
  name: String,
  brand: String,
  price: Number,
  category: String,
});

module.exports = mongoose.model("products", commerceSchema);
