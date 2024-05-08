require("../assignment-9/config/db.js");
const seedCommerce = require("../assignment-9/seedCommerce.js");
const commerceSchema = require("../models/commerceSchema.js");

const userInsert = async (req, res) => {
  const data = await commerceSchema.create(req.body);
  console.log(data);
  res.status(200).send(data);
};

const userFind = async (req, res) => {
  const data = await commerceSchema.find();
  console.log("data presented");
  res.status(200).send(data);
};

module.exports = { userFind, userInsert };
