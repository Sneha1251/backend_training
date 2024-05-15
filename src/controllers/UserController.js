const dbconnection = require("../assignment-8/config/db.js");
const seedCountry = require("../assignment-8/seedCountry.js");
const playingCountrySchema = require("../models/countrySchema.js");

dbconnection();
class Country {
  async postCountry(req, res) {
    const data = await playingCountrySchema.create(seedCountry);
    console.log("data added");
    res.status(200).send(data);
  }

  async getCountry(req, res) {
    const data = await playingCountrySchema.find();
    console.log("data presented");
    res.status(200).send(data);
  }
}

const country = new Country();
module.exports = country;
