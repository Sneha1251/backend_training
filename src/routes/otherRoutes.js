const express = require("express");

const { login, signup, getData } = require("../controllers/UserController");
const jwtAuthentication = require("../middlewares/jwtAuthentication");

const app = express();
app.use(express.json());

app.post("/customer/signup", signup);

app.post("/customer/login", login);

app.get("/customer/data", jwtAuthentication, getData);

app.listen(5000, () => {
  console.log("server is running on 5000 port");
});
