const express = require("express");
const authRoute = require("./authRoute");
const userRoute = require("./userRoute");

const appRoute = express();

appRoute.use("/auth", authRoute);
appRoute.use("/user", userRoute);

module.exports = appRoute;
