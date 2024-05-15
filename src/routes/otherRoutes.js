const express = require("express");

const country = require("../controllers/UserController.js");

const app = express();
app.use(express.json());

app.post("/country/add", country.postCountry);

app.get("/country/get", country.getCountry);

app.listen(5000, () => {
  console.log("Server running on port no 5000");
});
