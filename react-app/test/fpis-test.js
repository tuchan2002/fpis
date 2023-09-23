/* eslint-disable */
const { expect } = require('chai');
const { it, describe, before } = require('mocha');
/* eslint-enable */
const { ethers } = require('hardhat');

describe('FPIS Smart Contract', () => {
    const manufactoryTestEmail = 'manufactory1@example.com';
    const retailerTestEmail = 'retailer1@example.com';
    const customer1TestEmail = 'customer1@example.com';
    const customer2TestEmail = 'customer2@example.com';
    let fpisContract;

    before(async () => {
        fpisContract = await ethers.deployContract('FPIS');
    });

    it('Should create a product', async () => {
        const productID = '123';
        const model = 'Model 123';
        const description = 'Description 123';
        const manufactoryEmail = manufactoryTestEmail;
        const productionDate = '2023-09-24';

        const tx = await fpisContract.createProduct(
            productID,
            model,
            description,
            manufactoryEmail,
            productionDate
        );

        await tx.wait();

        const productDetail = await fpisContract.getProductDetail(productID);
        const products = await fpisContract.getAllProducts();

        expect(productDetail[0]).to.equal(model);
        expect(productDetail[1]).to.equal(description);
        expect(productDetail[2]).to.equal(manufactoryEmail);
        expect(products[1][0]).to.equal(productID);
    });

    it('Should move a product to a retailer', async () => {
        const productID = '123';
        const retailerEmail = retailerTestEmail;
        const movingDate = '2023-09-24';

        const tx = await fpisContract.moveToRetailer(productID, retailerEmail, movingDate);
        await tx.wait();

        const product = await fpisContract.getProductDetail(productID);

        expect(product[3]).to.equal(retailerEmail);
    });

    it('Should sell a product to a customer', async () => {
        const productID = '123';
        const retailerEmail = retailerTestEmail;
        const customerEmail = customer1TestEmail;
        const saleDate = '2023-09-25';

        await fpisContract.createCustomer(customerEmail, 'Customer 1', '1234567890');
        const tx = await fpisContract.sellToFirstCustomer(productID, retailerEmail, customerEmail, saleDate);
        await tx.wait();

        const product = await fpisContract.getProductDetail(productID);

        expect(product[4]).to.equal(customerEmail);
    });

    it('Should change customer for a product', async () => {
        const productID = '123';
        const oldCustomerEmail = customer1TestEmail;
        const newCustomerEmail = customer2TestEmail;
        const changeDate = '2023-09-26';

        await fpisContract.createCustomer(newCustomerEmail, 'Customer 2', '1234567890');
        const tx = await fpisContract.changeCustomer(productID, oldCustomerEmail, newCustomerEmail, changeDate);
        await tx.wait();

        const product = await fpisContract.getProductDetail(productID);
        const productsOfOldCustomer = await fpisContract.getProductsByCustomer(oldCustomerEmail);
        const productsOfNewCustomer = await fpisContract.getProductsByCustomer(newCustomerEmail);

        expect(product[4]).to.equal(newCustomerEmail);
        expect(productsOfOldCustomer).to.not.include(productID);
        expect(productsOfNewCustomer[0]).to.equal(productID);
    });

    it('Should get product details', async () => {
        const productID = '123';
        const [model, description, manufactoryEmail] = await fpisContract.getProductDetail(productID);
        expect(model).to.not.equal('');
        expect(description).to.not.equal('');
        expect(manufactoryEmail).to.not.equal('');
    });

    it('Should get products by retailer', async () => {
        const retailerEmail = retailerTestEmail;
        const [products, productIds] = await fpisContract.getProductsByRetailer(retailerEmail);
        expect(products.length).to.equal(1);
        expect(productIds.length).to.equal(1);
    });
});
