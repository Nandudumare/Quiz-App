const mongoose = require("mongoose");
require("dotenv").config();

const MURL = process.env.MURL;

const connection = mongoose.connect(MURL);

module.exports = connection;