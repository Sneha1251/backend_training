const mongoose = require("mongoose");

const dbconnection = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/Countries");
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = dbconnection;
