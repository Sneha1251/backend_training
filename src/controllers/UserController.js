const dbConnections = require("../assignment-9/config/db.js");
const seedCommerce = require("../assignment-9/seedCommerce.js");
const commerceSchema = require("../models/commerceSchema.js");

const dbconnection = require("../assignment-8/config/db.js");
const seedCountry = require("../assignment-8/seedCountry.js");
const playingCountrySchema = require("../models/countrySchema.js");

const dbAuthenticate = require("../assignment-10/config/db.js");
const customerSchema = require("../models/customerSchema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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

dbAuthenticate();

class Authentication {
  async signup(req, res) {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await customerSchema.create({
      username: username,
      email: email,
      password: hashedPassword,
    });

    if (newUser) {
      res.send(newUser);
    } else {
      res.send("Data is not saved in database");
    }
  }

  async login(req, res) {
    const { username, email, password } = req.body;

    const user = await customerSchema.findOne({ username: username });

    if (!user) {
      return res.status(404).send("User not found");
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      res.status(400).send("Invalid Password Try Again!!");
    } else {
      jwt.sign({ user }, process.env.JWT_SECURITY_KEY, (err, token) => {
        if (err) {
          res.send(err);
        }
        res.send(token);
      });
    }
  }

  getData(req, res) {
    if (!req.user) {
      return res.status(404).send("User not found");
    }

    res.send(`${req.user.user.username}, You are validate`);
  }
}

const commerce = new Commerce();
const country = new Country();
const authentication = new Authentication();

module.exports = { commerce, country, authentication };
