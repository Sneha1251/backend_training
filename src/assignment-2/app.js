const express = require("express");
const mockData = require("./mockData");

const app = express();
const PORT = 3000;

app.get("/api/list", (req, res, next) => {
  res.json(mockData);
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} port`);
});
