const router = require("express").Router();
const productController = require("../controllers/productController");
const isAuth = require("../middlewares/auth");
const isManufactory = require("../middlewares/isManufactory");

router.post("/", isAuth, isManufactory, productController.createProduct); // only manufactory
router.get("/:productID", isAuth, productController.getProductById);

module.exports = router;
