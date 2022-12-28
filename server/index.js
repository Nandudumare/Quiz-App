const express = require("express");
require("dotenv").config();
const connection = require("./config/db");

const cors = require("cors");
const problemModel = require("./models/problemModel");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  return res.send("hello problem");
});

app.get("/problem", async (req, res) => {
  const { category, difficulty, limit } = req.query;

  try {
    if (category && difficulty && limit) {
      let data = await problemModel
        .find({ category, difficulty })
        .limit(Number(limit));
      return res.send(data);
    } else {
      return res.status(404).send("Somthing went wrong");
    }
  } catch (err) {
    console.log("err:", err);
    return res.status(404).send("Somthing went wrong");
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
  try {
    await connection;
    console.log("server is running on port 8080");
  } catch (err) {
    console.log("err:", err);
    console.log("something went wrong with server");
  }
});
