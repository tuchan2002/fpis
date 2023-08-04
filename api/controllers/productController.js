const db = require("../models");
const {
  createProductOnBlockchain,
  getProductDetail,
  moveToRetailer,
  sellToFirstCustomer,
  getProductsByCustomer,
  changeCustomer,
} = require("../web3/product");

const productController = {
  createProduct: async (req, res) => {
    const { productID, model, description } = req.body;

    try {
      const user = await db.User.findOne({
        attributes: ["email"],
        where: {
          id: req.userId,
        },
      });

      const isSavedToBlockchain = await createProductOnBlockchain(
        productID,
        model,
        description,
        user.email
      );

      if (isSavedToBlockchain) {
        return res
          .status(201)
          .json({ success: true, message: "Save to blockchain success." });
      } else {
        return res.status(500).json({ message: "Save to blockchain failed." });
      }
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
            retailerEmail: productDetail[2],
            customerEmail: productDetail[3],
          },
        },
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

      Promise.all(productDetailListPromise).then((productDetailList) => {
        return res.status(201).json({
          success: true,
          data: {
            products: productDetailList.map((productDetail, index) => ({
              productID: productIdList[index],
              model: productDetail[0],
              description: productDetail[1],
              retailerEmail: productDetail[2],
              customerEmail: productDetail[3],
            })),
          },
        });
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  moveProductToRetailer: async (req, res) => {
    const { productID, retailerEmail } = req.body;

    try {
      const user = await db.User.findOne({
        where: {
          email: retailerEmail,
        },
      });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Email address does not exist." });
      }

      if (user.role !== 1) {
        return res.status(400).json({ message: "Email is not retailer." });
      }

      const isSavedToBlockchain = await moveToRetailer(
        productID,
        retailerEmail
      );
      if (isSavedToBlockchain) {
        return res
          .status(201)
          .json({ success: true, message: "Save to blockchain success." });
      } else {
        return res.status(500).json({ message: "Save to blockchain failed." });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  sellProductToCustomer: async (req, res) => {
    const { productID, customerEmail } = req.body;

    try {
      const customerUser = await db.User.findOne({
        where: {
          email: customerEmail,
        },
      });
      if (!customerUser) {
        return res
          .status(400)
          .json({ message: "Email address does not exist." });
      }
      if (customerUser.role !== 2) {
        return res.status(400).json({ message: "Email is not customer." });
      }

      const retailerUser = await db.User.findOne({
        attributes: ["email"],
        where: {
          id: req.userId,
        },
      });
      const isSavedToBlockchain = await sellToFirstCustomer(
        productID,
        retailerUser.email,
        customerEmail
      );

      if (isSavedToBlockchain) {
        return res
          .status(201)
          .json({ success: true, message: "Save to blockchain success." });
      } else {
        return res.status(500).json({ message: "Save to blockchain failed." });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  exchangeProductToAnotherCustomer: async (req, res) => {
    const { productID, newCustomerEmail } = req.body;

    try {
      const newCustomer = await db.User.findOne({
        where: {
          email: newCustomerEmail,
        },
      });
      if (!newCustomer) {
        return res
          .status(400)
          .json({ message: "Email address does not exist." });
      }
      if (newCustomer.role !== 2) {
        return res.status(400).json({ message: "Email is not customer." });
      }

      const oldCustomer = await db.User.findOne({
        attributes: ["email"],
        where: {
          id: req.userId,
        },
      });

      if (oldCustomer.email === newCustomerEmail) {
        return res
          .status(400)
          .json({ message: "Product cannot be exchanged for yourself." });
      }

      const productListOfOldCustomer = await getProductsByCustomer(
        oldCustomer.email
      );
      if (!productListOfOldCustomer.includes(productID)) {
        return res.status(400).json({ message: "You don't own this product." });
      }

      const isSavedToBlockchain = await changeCustomer(
        productID,
        oldCustomer.email,
        newCustomerEmail
      );

      if (isSavedToBlockchain) {
        return res
          .status(201)
          .json({ success: true, message: "Save to blockchain success." });
      } else {
        return res.status(500).json({ message: "Save to blockchain failed." });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};

module.exports = productController;
