const express = require("express");
const authRoute = require("./authRoute");
const userRoute = require("./userRoute");
const productRoute = require("./productRoute");

const appRoute = express();

appRoute.use("/auth", authRoute);
appRoute.use("/user", userRoute);
appRoute.use("/product", productRoute);

module.exports = appRoute;
