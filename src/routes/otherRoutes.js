const express = require("express");

const jwtAuthentication = require("../middlewares/jwtAuthentication");
const {
  commerce,
  country,
  authentication,
} = require("../controllers/UserController.js");
const commerceValidation = require("../middlewares/commerceValidation.js");
const country = require("../controllers/UserController.js");
const security = require("../middlewares/security.js");

const app = express();
app.use(express.json());
app.use(helmet());
app.use(security.setHeaders);

app.post("/customer/signup", authentication.signup);

app.post("/customer/login", authentication.login);

app.get("/customer/dashboard", jwtAuthentication, authentication.dashboard);

app.post("/customer/admin", authentication.isAdmin);

app.post("/commerce/post", commerceValidation, commerce.userInsert);

app.get("/commerce/get", commerce.userFind);

app.post("/country/add", country.postCountry);

app.get("/country/get", country.getCountry);

app.listen(5000, () => {
  console.log("Server running on port no 5000");
});
