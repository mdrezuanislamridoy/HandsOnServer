const mongoose = require("mongoose");
require("dotenv").config();

const dbUrl = process.env.DB_URL;

const Database = async () => {
  await mongoose.connect(dbUrl);
  console.log("Database connected");
};

module.exports = Database;
