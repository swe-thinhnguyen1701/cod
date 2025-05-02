const mongoose = require("mongoose");
require("dotenv").config();

const connectMongo = async () => {
  await mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/codwiki");
  console.log("Connected to MongoDB");
};

module.exports = connectMongo;