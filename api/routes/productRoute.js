const router = require("express").Router();
const productController = require("../controllers/productController");
const isAuth = require("../middlewares/auth");
const isManufactory = require("../middlewares/isManufactory");

router.post("/", isAuth, isManufactory, productController.createProduct); // only manufactory
router.get("/:productID", isAuth, productController.getProductById);
router.post(
  "/move-to-retailer",
  isAuth,
  isManufactory,
  productController.moveProductToRetailer
);
// router.post(
//   "/sell-to-customer",
//   isAuth,
//   isRetailer,
//   productController.sellProductToCustomer
// );

module.exports = router;
