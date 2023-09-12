const web3Api = require('../configs/web3Config');

const { contract, web3 } = web3Api;

let accountAddress = '';
web3.eth.getAccounts().then((accounts) => {
    accountAddress = accounts[0];
});

const getAllProducts = async () => {
    try {
        const data = await contract.methods
            .getAllProducts()
            .call({ from: accountAddress });

        return data;
    } catch (error) {
        console.error(error);
    }
};
const createProductOnBlockchain = async (
    productID,
    model,
    description,
    manufactoryEmail,
    manufactoryLocation,
    productionDate,
) => {
    try {
        return await contract.methods
            .createProduct(productID, model, description, manufactoryEmail, manufactoryLocation, productionDate)
            .send({
                from: accountAddress
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
        const productIdList = await contract.methods
            .getProductsByCustomer(customerEmail)
            .call({ from: accountAddress });
        console.log('getProductsByCustomer', productIdList);
        return productIdList;
    } catch (error) {
        console.error(error);
    }
};

const getProductsByManufactory = async (manufactoryEmail) => {
    try {
        const productList = await contract.methods
            .getProductsByManufactory(manufactoryEmail)
            .call({ from: accountAddress });

        return productList;
    } catch (error) {
        console.error(error);
    }
};

const getProductsByRetailer = async (retailerEmail) => {
    try {
        const productList = await contract.methods
            .getProductsByRetailer(retailerEmail)
            .call({ from: accountAddress });

        return productList;
    } catch (error) {
        console.error(error);
    }
};

const moveToRetailer = async (productID, retailerEmail, retailLocation, movingDate) => {
    try {
        return await contract.methods
            .moveToRetailer(productID, retailerEmail, retailLocation, movingDate)
            .send({
                from: accountAddress
            });
    } catch (error) {
        console.error(error);
    }
};

const sellToFirstCustomer = async (productID, retailerEmail, customerEmail, saleDate) => {
    try {
        return await contract.methods
            .sellToFirstCustomer(productID, retailerEmail, customerEmail, saleDate)
            .send({
                from: accountAddress
            });
    } catch (error) {
        console.error(error);
    }
};

const changeCustomer = async (
    productID,
    oldCustomerEmail,
    newCustomerEmail,
    changeDate
) => {
    try {
        return await contract.methods
            .changeCustomer(productID, oldCustomerEmail, newCustomerEmail, changeDate)
            .send({
                from: accountAddress
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
    getAllProducts,
    getProductsByManufactory,
    getProductsByRetailer
};
