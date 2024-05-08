const express = require("express");

const { countryGet, countryPost } = require("../controllers/UserController.js");

const app = express();
app.use(express.json());

app.post("/country/add", countryPost);

app.get("/country/get", countryGet);

app.listen(5000, () => {
  console.log("Server running on port no 5000");
});
