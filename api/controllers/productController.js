const db = require('../models');
const {
    createProductOnBlockchain,
    getProductDetail,
    moveToRetailer,
    sellToFirstCustomer,
    getProductsByCustomer,
    changeCustomer,
    getAllProducts
} = require('../web3/product');

const productController = {
    getAllOfProducts: async (req, res) => {
        try {
            const data = await getAllProducts();
            const productsResult = data[0].map((product, index) => ({
                productID: data[1][index],
                model: product[0],
                description: product[1],
                manufactoryEmail: product[2],
                retailerEmail: product[3],
                customerEmail: product[4]
            }));

            return res.status(200).json({
                success: true,
                data: {
                    products: productsResult
                },
                message: 'Successfully retrieved product information.'
            });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    createProduct: async (req, res) => {
        const {
            productID, model, description, productionDate
        } = req.body;

        try {
            const user = await db.User.findOne({
                attributes: ['email'],
                where: {
                    id: req.userId
                }
            });

            const result = await createProductOnBlockchain(
                productID,
                model,
                description,
                user.email,
                user.location,
                productionDate
            );

            if (result.status === 1n) {
                return res
                    .status(201)
                    .json({ success: true, message: 'Successfully saved product to the blockchain.'});
            }
            return res.status(500).json({ message: 'Failed to save product to the blockchain.' });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },

    getProductById: async (req, res) => {
        const { productID } = req.params;

        try {
            const productDetail = await getProductDetail(productID);

            return res.status(201).json({
                success: true,
                data: {
                    product: {
                        productID,
                        model: productDetail[0],
                        description: productDetail[1],
                        manufactoryEmail: productDetail[2],
                        retailerEmail: productDetail[3],
                        customerEmail: productDetail[4]
                    }
                },
                message: 'Successfully retrieved product information.'
            });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },

    getProductsByCustomer: async (req, res) => {
        const { customerEmail } = req.body;

        try {
            const productIdList = await getProductsByCustomer(customerEmail);

            const productDetailListPromise = [];
            productIdList.forEach((productId) => {
                const productDetail = getProductDetail(productId);
                productDetailListPromise.push(productDetail);
            });

            Promise.all(productDetailListPromise).then((productDetailList) => res.status(201).json({
                success: true,
                data: {
                    products: productDetailList.map((productDetail, index) => ({
                        productID: productIdList[index],
                        model: productDetail[0],
                        description: productDetail[1],
                        retailerEmail: productDetail[2],
                        customerEmail: productDetail[3]
                    }))
                },
                message: 'Successfully retrieved customer\'s product information.'
            }));
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },

    moveProductToRetailer: async (req, res) => {
        const { productID, retailerEmail, retailLocation } = req.body;

        try {
            const user = await db.User.findOne({
                where: {
                    email: retailerEmail
                }
            });
            if (!user) {
                return res
                    .status(400)
                    .json({ message: 'Email address does not exist.' });
            }

            if (user.role !== 1) {
                return res.status(400).json({ message: 'Email is not retailer.' });
            }

            const result = await moveToRetailer(
                productID,
                retailerEmail,
                retailLocation
            );
            if (result.status === 1n) {
                return res
                    .status(201)
                    .json({ success: true, message: 'Successfully moved the product to the retailer.' });
            }
            return res.status(500).json({ message: 'Failed to move the product to the retailer.' });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },

    sellProductToCustomer: async (req, res) => {
        const { productID, customerEmail, saleDate } = req.body;

        try {
            const customerUser = await db.User.findOne({
                where: {
                    email: customerEmail
                }
            });
            if (!customerUser) {
                return res
                    .status(400)
                    .json({ message: 'Email address does not exist.' });
            }
            if (customerUser.role !== 2) {
                return res.status(400).json({ message: 'Email is not customer.' });
            }

            const retailerUser = await db.User.findOne({
                attributes: ['email'],
                where: {
                    id: req.userId
                }
            });
            const result = await sellToFirstCustomer(
                productID,
                retailerUser.email,
                customerEmail,
                saleDate
            );

            if (result.status === 1n) {
                return res
                    .status(201)
                    .json({ success: true, message: 'Successfully sold the product to the customer.' });
            }
            return res.status(500).json({ message: 'Failed to sell the product to the customer.' });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },

    exchangeProductToAnotherCustomer: async (req, res) => {
        const { productID, newCustomerEmail, changeDate } = req.body;

        try {
            const newCustomer = await db.User.findOne({
                where: {
                    email: newCustomerEmail
                }
            });
            if (!newCustomer) {
                return res
                    .status(400)
                    .json({ message: 'Email address does not exist.' });
            }
            if (newCustomer.role !== 2) {
                return res.status(400).json({ message: 'Email is not customer.' });
            }

            const oldCustomer = await db.User.findOne({
                attributes: ['email'],
                where: {
                    id: req.userId
                }
            });

            if (oldCustomer.email === newCustomerEmail) {
                return res
                    .status(400)
                    .json({ message: 'Product cannot be exchanged for yourself.' });
            }

            const productListOfOldCustomer = await getProductsByCustomer(
                oldCustomer.email
            );
            if (!productListOfOldCustomer.includes(productID)) {
                return res.status(400).json({ message: 'You don\'t own this product.' });
            }

            const result = await changeCustomer(
                productID,
                oldCustomer.email,
                newCustomerEmail,
                changeDate
            );

            if (result.status === 1n) {
                return res
                    .status(201)
                    .json({ success: true, message: 'Successfully exchanged the product to another customer.' });
            }
            return res.status(500).json({ message: 'Failed to exchange the product.'});
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
};

module.exports = productController;
