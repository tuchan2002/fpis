require("dotenv").config();
const express = require("express");
const cors = require("cors");
const appRoute = require("./routes");
const db = require("./models");
const web3Api = require("./configs/web3Config");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1", appRoute);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Sever is listening on port: ${port}`);
});
