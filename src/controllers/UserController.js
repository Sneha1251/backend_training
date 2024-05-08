require("../assignment-8/config/db.js");
const seedCountry = require("../assignment-8/seedCountry.js");
const countrySchema = require("../models/countrySchema.js");

const countryPost = async (req, res) => {
  const data = await countrySchema.create(req.body);
  console.log("data added");
  res.status(200).send(data);
};

const countryGet = async (req, res) => {
  const data = await countrySchema.find();
  console.log("data presented");
  res.status(200).send(data);
};

module.exports = { countryGet, countryPost };
