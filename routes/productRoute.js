const router = require("express").Router();
const productController = require("../controllers/productController");
const isAuth = require("../middlewares/auth");

router.get("/", isAuth, productController.getProductsOwned);

module.exports = router;
