export const getAllProducts = async () => {
    try {
        const data = await contract.methods
            .getAllProducts()
            .call({ from: accountAddress });

        const productsResult = data[0].map((product, index) => {
            const productHistory = product.history.map((item) => ({
                timestamp: item.timestamp.toString(),
                action: item.action,
                details: item.details,
                date: item.date
            }));

            return ({
                productID: data[1][index],
                model: product[0],
                description: product[1],
                manufactoryEmail: product[2],
                retailerEmail: product[3],
                customerEmail: product[4],
                history: productHistory
            });
        });

        return productsResult;
    } catch (error) {
        console.error(error);
    }
};
export const createProductOnBlockchain = async (
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

export const getProductDetail = async (productID) => {
    try {
        const productDetail = await contract.methods
            .getProductDetail(productID)
            .call({ from: accountAddress });


        return {
            productID,
            model: productDetail[0],
            description: productDetail[1],
            manufactoryEmail: productDetail[2],
            retailerEmail: productDetail[3],
            customerEmail: productDetail[4],
            history: productDetail[5].map((item) => ({
                timestamp: item.timestamp.toString(),
                action: item.action,
                details: item.details,
                date: item.date
            }))
        }
    } catch (error) {
        console.error(error);
    }
};

export const getProductsByCustomer = async (customerEmail) => {
    try {
        const productIdList = await contract.methods
            .getProductsByCustomer(customerEmail)
            .call({ from: accountAddress });

            const productDetailListPromise = [];
            productIdList.forEach((productId) => {
                const productDetail = getProductDetail(productId);
                productDetailListPromise.push(productDetail);
            });

            Promise.all(productDetailListPromise).then((productDetailList) => 
                 {

                    return productDetailList.map((productDetail, index) => ({
                        productID: productIdList[index],
                        model: productDetail[0],
                        description: productDetail[1],
                        manufactoryEmail: productDetail[2],
                        retailerEmail: productDetail[3],
                        customerEmail: productDetail[4],
                        history: productDetail[5].map((item) => ({
                            timestamp: item.timestamp.toString(),
                            action: item.action,
                            details: item.details,
                            date: item.date
                        }))
                    }))
                },
            );
    } catch (error) {
        console.error(error);
    }
};

export const getProductsByManufactory = async (manufactoryEmail) => {
    try {
        const productList = await contract.methods
            .getProductsByManufactory(manufactoryEmail)
            .call({ from: accountAddress });


            const productsResult = data[0].map((product, index) => {
                const productHistory = product.history.map((item) => ({
                    timestamp: item.timestamp.toString(),
                    action: item.action,
                    details: item.details,
                    date: item.date
                }));

                return ({
                    productID: data[1][index],
                    model: product[0],
                    description: product[1],
                    manufactoryEmail: product[2],
                    retailerEmail: product[3],
                    customerEmail: product[4],
                    history: productHistory
                });
            });

            return productsResult
    } catch (error) {
        console.error(error);
    }
};

export const getProductsByRetailer = async (retailerEmail) => {
    try {
        const productList = await contract.methods
            .getProductsByRetailer(retailerEmail)
            .call({ from: accountAddress });

            const productsResult = data[0].map((product, index) => {
                const productHistory = product.history.map((item) => ({
                    timestamp: item.timestamp.toString(),
                    action: item.action,
                    details: item.details,
                    date: item.date
                }));

                return ({
                    productID: data[1][index],
                    model: product[0],
                    description: product[1],
                    manufactoryEmail: product[2],
                    retailerEmail: product[3],
                    customerEmail: product[4],
                    history: productHistory
                });
            });

            return productsResult
    } catch (error) {
        console.error(error);
    }
};

export const moveToRetailer = async (productID, retailerEmail, retailLocation, movingDate) => {
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

export const sellToFirstCustomer = async (productID, retailerEmail, customerEmail, saleDate) => {
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

export const changeCustomer = async (
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

