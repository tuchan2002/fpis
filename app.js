require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER_NAME,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
});
connection.connect((err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  } else {
    console.log("Mysql Connected");
  }
});

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Sever is listening on port: ${port}`);
});
