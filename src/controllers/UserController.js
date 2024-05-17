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
    const { username, email, password, roles } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await customerSchema.create({
      username: username,
      email: email,
      password: hashedPassword,
      roles: roles,
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

  dashboard(req, res) {
    res.send(
      `${req.user.user.username}, Welcome to dashboard!  You are valid user`
    );
  }

  async isAdmin(req, res) {
    const { password, email } = req.body;
    try {
      const user = await customerSchema.findOne({ email });

      if (!user) {
        return res.status(403).send("Invalid credentials!");
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(403).send("Invalid Password!");
      }

      if (user.roles !== "admin") {
        return res
          .status(403)
          .send("Access Denied, Admin privileges required!");
      }
      return res.status(200).send("Admin! You are Authorised for data ");
    } catch (err) {
      return res.status(500).send(err.message);
    }
  }
}

const commerce = new Commerce();
const country = new Country();
const authentication = new Authentication();

module.exports = { commerce, country, authentication };
