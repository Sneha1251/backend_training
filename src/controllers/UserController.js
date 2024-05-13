const db = require("../assignment-10/config/db.js");
const customerSchema = require("../models/customerSchema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signup = async (req, res) => {
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
};

const login = async (req, res) => {
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
};

const dashboard = (req, res) => {
  res.send(
    `${req.user.user.username}, Welcome to dashboard!  You are valid user`
  );
};

const isAdmin = async (req, res) => {
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
      return res.status(403).send("Access Denied, Admin privileges required!");
    }
    return res.status(200).send("Admin! You are Authorised for data ");
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = { signup, login, dashboard, isAdmin };
