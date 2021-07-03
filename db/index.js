/**
 * 1. create a connection function for mongodb
 * 2. start a local mongodb server connection
 */

const mongoose = require("mongoose");
require("dotenv").config();
const { MONGO_URL } = process.env;

//
// Async mongoose connection
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("MongoDB connected ..");

    //   seed data
  } catch (err) {
    console.error(err.message);

    //   exit with failure
    process.exit(1);
  }
};

module.exports = connectDB;
