const express = require("express");

const validateRequest = require("../middlewares/validateRequest");
const queryValidation = require("../middlewares/queryValidation");
const locationValidation = require("../middlewares/locationValidation");

const validationError = require("../middlewares/validationError");

const app = express();

app.post("/validate", validateRequest, (req, res) => {
  res.json({ message: "user validated!" });
});

app.get("/location", locationValidation, (req, res) => {
  res.json({ message: "user can access" });
});

app.post("/query/:id", queryValidation, (req, res) => {
  res.json({ message: `user ${req.params.id}` });
});

app.get("/async-error", async (req, res, next) => {
  try {
    throw new Error("Async Error");
  } catch (err) {
    next(err);
  }
});

app.get("/validation/error/:id", validationError, (req, res) => {
  res.status(200).json({ message: "User details retreived successfully" });
});

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
