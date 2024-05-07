const mongoose = require("mongoose");
const countrySchema = new mongoose.Schema({
  name: String,
  code: String,
  playing: Boolean,
});

module.exports = mongoose.model("playings", countrySchema);
