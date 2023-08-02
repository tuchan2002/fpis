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

  // sellProductToCustomer: async (req, res) => {
  //   try {
  //   } catch (err) {
  //     return res.status(500).json({ message: err.message });
  //   }
  // },
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

    console.log(productDetail);
    return productDetail;
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

    console.log(productDetail);
    return productDetail;
  } catch (error) {
    console.error(error);
  }
};

module.exports = productController;
