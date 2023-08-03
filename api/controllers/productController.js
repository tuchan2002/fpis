const web3Api = require("../configs/web3Config");
const db = require("../models");
const { web3, contract } = web3Api;

let accountAddress = "";
web3.eth.getAccounts().then((accounts) => {
  accountAddress = accounts[0];
});

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
      console.log("isSavedToBlockchain", isSavedToBlockchain);
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
      console.log(productDetail);

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

      console.log("is Saved To Blockchain", isSavedToBlockchain);

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
      console.log("oldCustomer", oldCustomer.email);
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

      console.log(
        "exchangeProductToAnotherCustomer isSavedToBlockchain",
        isSavedToBlockchain
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

const createProductOnBlockchain = async (
  productID,
  model,
  description,
  manufactoryEmail
) => {
  try {
    return await contract.methods
      .createProduct(productID, model, description, manufactoryEmail)
      .send({
        from: accountAddress,
      });
  } catch (error) {
    console.error(error);
  }
};

const getProductDetail = async (productID) => {
  try {
    const productDetail = await contract.methods
      .getProductDetail(productID)
      .call({ from: accountAddress });

    return productDetail;
  } catch (error) {
    console.error(error);
  }
};

const getProductsByCustomer = async (customerEmail) => {
  try {
    const productList = await contract.methods
      .getProductsByCustomer(customerEmail)
      .call({ from: accountAddress });

    console.log(productList);
    return productList;
  } catch (error) {
    console.error(error);
  }
};

const moveToRetailer = async (productID, retailerEmail) => {
  try {
    return await contract.methods
      .moveToRetailer(productID, retailerEmail)
      .send({
        from: accountAddress,
      });
  } catch (error) {
    console.error(error);
  }
};

const sellToFirstCustomer = async (productID, retailerEmail, customerEmail) => {
  try {
    return await contract.methods
      .sellToFirstCustomer(productID, retailerEmail, customerEmail)
      .send({
        from: accountAddress,
      });
  } catch (error) {
    console.error(error);
  }
};

const changeCustomer = async (
  productID,
  oldCustomerEmail,
  newCustomerEmail
) => {
  try {
    return await contract.methods
      .changeCustomer(productID, oldCustomerEmail, newCustomerEmail)
      .send({
        from: accountAddress,
      });
  } catch (error) {
    console.error(error);
  }
};

module.exports = productController;
