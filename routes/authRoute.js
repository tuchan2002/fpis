const authController = require("../controllers/authController");

const router = require("express").Router();

router.post("/register", authController.register);

module.exports = router;
