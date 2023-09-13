const router = require('express').Router();
const productController = require('../controllers/productController');
const isAuth = require('../middlewares/auth');
const isManufactory = require('../middlewares/isManufactory');
const isRetailer = require('../middlewares/isRetailer');
const isCustomer = require('../middlewares/isCustomer');
const isManufactoryAndRetailer = require('../middlewares/isManufactoryAndRetailer');

router.get('/', isAuth, productController.getAllOfProducts);
router.post('/', isAuth, isManufactory, productController.createProduct);
router.get('/owned', isAuth, isManufactoryAndRetailer, productController.getOwnedProducts);
router.get('/customer/:customerId', isAuth, productController.getProductsByCustomer);
router.get('/:productID', isAuth, productController.getProductById);
router.post(
    '/move-to-retailer',
    isAuth,
    isManufactory,
    productController.moveProductToRetailer
);
router.post(
    '/sell-to-customer',
    isAuth,
    isRetailer,
    productController.sellProductToCustomer
);
router.post(
    '/exchange-another-customer',
    isAuth,
    isCustomer,
    productController.exchangeProductToAnotherCustomer
);
router.post(
    '/verify-product',
    isAuth,
    isCustomer,
    productController.verifyProduct
);

module.exports = router;
