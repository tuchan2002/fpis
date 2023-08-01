const router = require("express").Router();
const productController = require("../controllers/productController");
const isAuth = require("../middlewares/auth");

router.get("/", isAuth, productController.getProductsOwned);
router.post("/", productController.createProduct); // only manufactory

module.exports = router;
