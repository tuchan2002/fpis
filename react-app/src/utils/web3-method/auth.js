export const createManufactory = async ({
    email, name
}, contract, accountAddress) => {
    try {
        return await contract.methods
            .createManufactory(email, name)
            .send({
                from: accountAddress
            });
    } catch (error) {
        console.error(error);
    }
};

export const createRetailer = async ({
    email, name
}, contract, accountAddress) => {
    try {
        return await contract.methods
            .createRetailer(email, name)
            .send({
                from: accountAddress
            });
    } catch (error) {
        console.error(error);
    }
};

export const createCustomer = async ({
    email, name
}, contract, accountAddress) => {
    try {
        return await contract.methods
            .createCustomer(email, name)
            .send({
                from: accountAddress
            });
    } catch (error) {
        console.error(error);
    }
};

export const removeManufactory = async ({
    email
}, contract, accountAddress) => {
    try {
        return await contract.methods
            .removeManufactory(email)
            .send({
                from: accountAddress
            });
    } catch (error) {
        console.error(error);
    }
};

export const removeRetailer = async ({
    email
}, contract, accountAddress) => {
    try {
        return await contract.methods
            .removeRetailer(email)
            .send({
                from: accountAddress
            });
    } catch (error) {
        console.error(error);
    }
};

export const removeCustomer = async ({
    email
}, contract, accountAddress) => {
    try {
        return await contract.methods
            .removeCustomer(email)
            .send({
                from: accountAddress
            });
    } catch (error) {
        console.error(error);
    }
};
