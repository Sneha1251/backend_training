const express = require("express");

const authentication = require("../controllers/UserController");
const jwtAuthentication = require("../middlewares/jwtAuthentication");

const commerce = require("../controllers/UserController.js");
const commerceValidation = require("../middlewares/commerceValidation.js");

const country = require("../controllers/UserController.js");

const app = express();
app.use(express.json());

app.post("/customer/signup", authentication.signup);

app.post("/customer/login", authentication.login);

app.get("/customer/data", jwtAuthentication, authentication.getData);

app.post("/commerce/post", commerceValidation, commerce.userInsert);

app.get("/commerce/get", commerce.userFind);

app.post("/country/add", country.postCountry);

app.get("/country/get", country.getCountry);

app.listen(5000, () => {
  console.log("Server running on port no 5000");
});
