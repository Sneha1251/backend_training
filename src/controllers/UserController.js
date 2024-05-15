const dbConnections = require("../assignment-9/config/db.js");
const seedCommerce = require("../assignment-9/seedCommerce.js");
const commerceSchema = require("../models/commerceSchema.js");

const dbconnection = require("../assignment-8/config/db.js");
const seedCountry = require("../assignment-8/seedCountry.js");
const playingCountrySchema = require("../models/countrySchema.js");

dbConnections();

class Commerce {
  async userInsert(req, res) {
    const data = await commerceSchema.create(req.body);
    console.log(data);
    res.status(200).send(data);
  }

  async userFind(req, res) {
    const data = await commerceSchema.find();
    console.log("data presented");
    res.status(200).send(data);
  }
}

dbconnection();

class Country {
  async postCountry(req, res) {
    const data = await playingCountrySchema.create(req.body);
    console.log("data added");
    res.status(200).send(data);
  }

  async getCountry(req, res) {
    const data = await playingCountrySchema.find();
    console.log("data presented");
    res.status(200).send(data);
  }
}
const commerce = new Commerce();
const country = new Country();

module.exports = { commerce, country };
