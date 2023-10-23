export const getAllProducts = async (contract, accountAddress) => {
    try {
        const data = await contract.methods
            .getAllProducts()
            .call({ from: accountAddress });

        const productsResult = data[0].map(
            (product, index) => {
                const productHistory = product.history.map((item) => ({
                    timestamp: item.timestamp.toString(),
                    action: item.action,
                    details: item.details,
                    date: item.date
                }));

                return {
                    productID: data[1][index],
                    model: product[0],
                    manufactoryEmail: product[1],
                    retailerEmail: product[2],
                    customerEmail: product[3],
                    history: productHistory,
                    imageURL: product[5]
                };
            }
        );

        return productsResult;
    } catch (error) {
        console.error(error);
    }
};
export const createProductOnBlockchain = async (
    {
        productID,
        model,
        manufactoryEmail,
        productionDate,
        imageURL
    },
    contract,
    accountAddress
) => {
    try {
        return await contract.methods
            .createProduct(
                productID,
                model,
                manufactoryEmail,
                productionDate,
                imageURL
            )
            .send({
                from: accountAddress
            });
    } catch (error) {
        throw error;
    }
};

export const getProductDetail = async (
    productID,
    contract,
    accountAddress
) => {
    try {
        const productDetail = await contract.methods
            .getProductDetail(productID)
            .call({ from: accountAddress });

        return {
            productID,
            model: productDetail[0],
            manufactoryEmail: productDetail[1],
            retailerEmail: productDetail[2],
            customerEmail: productDetail[3],
            history: productDetail[4].map((item) => ({
                timestamp: item.timestamp.toString(),
                action: item.action,
                details: item.details,
                date: item.date
            })),
            imageURL: productDetail[5]
        };
    } catch (error) {
        console.log('error', error);
        throw error;
    }
};

export const getProductsByCustomer = async (customerEmail, contract, accountAddress) => {
    try {
        const productIdList = await contract.methods.getProductsByCustomer(customerEmail).call({ from: accountAddress });

        const productDetailListPromise = [];
        productIdList.forEach((productId) => {
            const productDetail = contract.methods.getProductDetail(productId).call({ from: accountAddress });
            productDetailListPromise.push(productDetail);
        });

        const productsResult = Promise.all(productDetailListPromise).then((productDetailList) => productDetailList.map((productDetail, index) => ({
            productID: productIdList[index],
            model: productDetail[0],
            manufactoryEmail: productDetail[1],
            retailerEmail: productDetail[2],
            customerEmail: productDetail[3],
            history: productDetail[4].map((item) => ({
                timestamp: item.timestamp.toString(),
                action: item.action,
                details: item.details,
                date: item.date
            })),
            imageURL: productDetail[5]
        })));

        return productsResult;
    } catch (error) {
        console.error(error);
    }
};
export const getProductsByManufactory = async (manufactoryEmail, contract,
    accountAddress) => {
    try {
        const data = await contract.methods
            .getProductsByManufactory(manufactoryEmail)
            .call({ from: accountAddress });

        const productsResult = data[0].map((product, index) => {
            const productHistory = product.history.map((item) => ({
                timestamp: item.timestamp.toString(),
                action: item.action,
                details: item.details,
                date: item.date
            }));

            return {
                productID: data[1][index],
                model: product[0],
                manufactoryEmail: product[1],
                retailerEmail: product[2],
                customerEmail: product[3],
                history: productHistory,
                imageURL: product[5]
            };
        });

        return productsResult;
    } catch (error) {
        console.error(error);
    }
};

export const getProductsByRetailer = async (retailerEmail, contract,
    accountAddress) => {
    try {
        const data = await contract.methods
            .getProductsByRetailer(retailerEmail)
            .call({ from: accountAddress });

        const productsResult = data[0].map((product, index) => {
            const productHistory = product.history.map((item) => ({
                timestamp: item.timestamp.toString(),
                action: item.action,
                details: item.details,
                date: item.date
            }));

            return {
                productID: data[1][index],
                model: product[0],
                manufactoryEmail: product[1],
                retailerEmail: product[2],
                customerEmail: product[3],
                history: productHistory,
                imageURL: product[5]
            };
        });

        return productsResult;
    } catch (error) {
        console.error(error);
    }
};

export const moveToRetailer = async (
    {
        productID,
        retailerEmail,
        movingDate
    },
    contract,
    accountAddress
) => {
    try {
        return await contract.methods
            .moveToRetailer(
                productID,
                retailerEmail,
                movingDate
            )
            .send({
                from: accountAddress
            });
    } catch (error) {
        throw error;
    }
};

export const sellToCustomer = async (
    {
        productID,
        retailerEmail,
        customerEmail,
        saleDate
    },
    contract,
    accountAddress
) => {
    try {
        return await contract.methods
            .sellToCustomer(
                productID,
                retailerEmail,
                customerEmail,
                saleDate
            )
            .send({
                from: accountAddress
            });
    } catch (error) {
        throw error;
    }
};

export const changeCustomer = async (
    {
        productID,
        oldCustomerEmail,
        newCustomerEmail,
        changeDate
    },
    contract,
    accountAddress
) => {
    try {
        return await contract.methods
            .changeCustomer(
                productID,
                oldCustomerEmail,
                newCustomerEmail,
                changeDate
            )
            .send({
                from: accountAddress
            });
    } catch (error) {
        throw error;
    }
};
