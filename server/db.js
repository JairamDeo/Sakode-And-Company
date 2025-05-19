// /dbjs
const mongoose = require('mongoose');
require('dotenv').config();

/* connection queries */
const MONGO_URI = process.env.MONGO_URI;
/* connection queries */

const mongoDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected");

  } catch (err) {
    console.error("---", err);
  }
};

module.exports = mongoDB;