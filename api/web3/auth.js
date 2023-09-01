const web3Api = require('../configs/web3Config');

const { contract, web3 } = web3Api;

let accountAddress = '';
web3.eth.getAccounts().then((accounts) => {
    accountAddress = accounts[0];
});

const createManufactory = async (email, name, location) => {
    try {
        return await contract.methods
            .createManufactory(email, name, location)
            .send({
                from: accountAddress
            });
    } catch (error) {
        console.error(error);
    }
};

const createRetailer = async (email, name, location) => {
    try {
        return await contract.methods.createRetailer(email, name, location).send({
            from: accountAddress
        });
    } catch (error) {
        console.error(error);
    }
};

const createCustomer = async (email, name, location, phone_number) => {
    try {
        return await contract.methods
            .createCustomer(email, name, location, phone_number)
            .send({
                from: accountAddress
            });
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    createManufactory,
    createRetailer,
    createCustomer
};
