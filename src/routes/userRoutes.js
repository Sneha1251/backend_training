const express = require("express");
const createError = require("http-errors");
require("dotenv").config();

const validateRequest = require("../middlewares/validateRequest");
const queryValidation = require("../middlewares/queryValidation");
const locationValidation = require("../middlewares/locationValidation");

const { generateUsers } = require("../assignment-4/generateDataFunction");
const { generatePosts } = require("../assignment-4/generateDataFunction");

const jwtAuthentication = require("../middlewares/jwtAuthentication");
const generateDummyToken = require("../middlewares/generateDummyToken");

const requestLogger = require("../middlewares/logger");
const errorHandler = require("../middlewares/errorHandler");
const customHeader = require("../middlewares/customHeader");
const rateLimiter = require("../middlewares/rateLimiter");
const validationError = require("../middlewares/validationError");

const {
  middleware1,
  middleware2,
  middleware3,
} = require("../middlewares/middlewareChain");

const app = express();

app.use(requestLogger);
app.use(customHeader("MyCustomValue"));
app.use(rateLimiter(1));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Home Page" });
});

app.post("/validate", validateRequest, (req, res) => {
  res.json({ message: "user validated!" });
});

app.get("/location", locationValidation, (req, res) => {
  res.json({ message: "user can access" });
});

app.post("/query/:id", queryValidation, (req, res) => {
  res.json({ message: `user ${req.params.id}` });
});

app.get("/api/users", (req, res) => {
  const users = generateUsers();
  res.json(users);
});

app.post("/api/posts", (req, res) => {
  const posts = generatePosts();
  res.json(posts);
});

app.get(
  "/authenticate/protected",
  generateDummyToken,
  jwtAuthentication,
  (req, res) => {
    res.json({ message: "Authentication successful" });
  }
);

app.get("/authenticate/public", (req, res) => {
  res.json({ message: "This is a public route" });
});

app.get("/middleware", middleware1, middleware2, middleware3, (req, res) => {
  res.json("Middleware check Done");
});

app.get("/error-500", (req, res, next) => {
  next(createError(500, "Internal server Error"));
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

app.use(errorHandler);

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
