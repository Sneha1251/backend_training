const mongoose = require("mongoose");

const dbconnections = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/e-commerce");
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = dbconnections;
