const express = require("express");
const authRoute = require("./authRoute");

const appRoute = express();

appRoute.use("/auth", authRoute);

module.exports = appRoute;
