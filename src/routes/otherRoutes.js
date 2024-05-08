const express = require("express");

const { userFind, userInsert } = require("../controllers/UserController.js");

const commerceValidation = require("../middlewares/commerceValidation.js");

const app = express();
app.use(express.json());

app.post("/commerce/post", commerceValidation, userInsert);

app.get("/commerce/get", userFind);

app.listen(5000, () => {
  console.log("Server is running on 5000");
});
