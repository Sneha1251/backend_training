require("../assignment-10/config/db.js");
const customerSchema = require("../models/customerSchema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signup = async (req, res) => {
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
};

const login = async (req, res) => {
  const { username, email, password } = req.body;

  const user = await customerSchema.findOne({ username: username });

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
};

const getData = (req, res) => {
  res.send(`${req.user.user.username}, You are validate`);
};

module.exports = { signup, login, getData };
