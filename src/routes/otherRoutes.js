const express = require("express");
require("../assignment-8/config/db.js");
const seedCountry = require("../assignment-8/seedCountry.js");
const countrySchema = require("../models/countrySchema.js");

const app = express();
app.use(express.json());

app.post("/add", async (req, res) => {
  const data = await countrySchema.insertMany(seedCountry);
  console.log("data added");
  res.status(200).send(data);
});

app.get("/get", async (req, res) => {
  const data = await countrySchema.find();
  console.log("data presented");
  res.status(200).send(data);
});

app.listen(5000, () => {
  console.log("Server running on port no 5000");
});
