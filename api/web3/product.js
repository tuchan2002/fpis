const web3Api = require("../configs/web3Config");
const { contract, web3 } = web3Api;

let accountAddress = "";
web3.eth.getAccounts().then((accounts) => {
  accountAddress = accounts[0];
});

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

module.exports = {
  createProductOnBlockchain,
  getProductDetail,
  getProductsByCustomer,
  moveToRetailer,
  sellToFirstCustomer,
  changeCustomer,
};
