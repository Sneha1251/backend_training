const mongoose = require("mongoose");

const playingCountrySchema = new mongoose.Schema({
  name: String,
  code: String,
  playing: Boolean,
});

module.exports = mongoose.model("countryPlaying", playingCountrySchema);
