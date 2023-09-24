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

    it('Should create a manufactory', async () => {
        const manufactoryEmail = manufactoryTestEmail;
        const manufactoryName = 'Manufactory 1';

        const tx = await fpisContract.createManufactory(manufactoryEmail, manufactoryName);
        await tx.wait();

        const manufactoryDetail = await fpisContract.getManufactoryDetail(manufactoryEmail);
        expect(manufactoryDetail[0]).to.equal(manufactoryName);
    });

    it('Should fail to create a manufactory with an existing email', async () => {
        const manufactoryEmail = manufactoryTestEmail;
        const manufactoryName = 'Manufactory 2';

        const tx = fpisContract.createManufactory(manufactoryEmail, manufactoryName);
        await expect(tx).to.be.revertedWith('Email already exists');
    });

    it('Should fail to create a manufactory with empty email', async () => {
        const manufactoryEmail = '';
        const manufactoryName = 'Manufactory 2';

        const tx = fpisContract.createManufactory(manufactoryEmail, manufactoryName);
        await expect(tx).to.be.revertedWith('Manufactory email cannot be empty');
    });

    it('Should fail to create a manufactory with empty name', async () => {
        const manufactoryEmail = 'manufactory@example.com';
        const manufactoryName = '';

        const tx = fpisContract.createManufactory(manufactoryEmail, manufactoryName);
        await expect(tx).to.be.revertedWith('Manufactory name cannot be empty');
    });

    it('Should create a retailer', async () => {
        const retailerEmail = retailerTestEmail;
        const retailerName = 'Retailer 1';

        const tx = await fpisContract.createRetailer(retailerEmail, retailerName);
        await tx.wait();

        const retailerDetail = await fpisContract.getRetailerDetail(retailerEmail);
        expect(retailerDetail[0]).to.equal(retailerName);
    });

    it('Should fail to create a retailer with an existing email', async () => {
        const retailerEmail = retailerTestEmail;
        const retailerName = 'Retailer 2';

        const tx = fpisContract.createRetailer(retailerEmail, retailerName);
        await expect(tx).to.be.revertedWith('Email already exists');
    });

    it('Should fail to create a retailer with empty email', async () => {
        const retailerEmail = '';
        const retailerName = 'Retailer 3';

        const tx = fpisContract.createRetailer(retailerEmail, retailerName);
        await expect(tx).to.be.revertedWith('Retailer email cannot be empty');
    });

    it('Should fail to create a retailer with empty name', async () => {
        const retailerEmail = 'retailer@example.com';
        const retailerName = '';

        const tx = fpisContract.createRetailer(retailerEmail, retailerName);
        await expect(tx).to.be.revertedWith('Retailer name cannot be empty');
    });

    it('Should create a customer', async () => {
        const customerEmail = customer1TestEmail;
        const customerName = 'Customer 1';

        const tx = await fpisContract.createCustomer(customerEmail, customerName);
        await tx.wait();

        const customerDetail = await fpisContract.getCustomerDetail(customerEmail);
        expect(customerDetail[0]).to.equal(customerName);
    });

    it('Should fail to create a customer with an existing email', async () => {
        const customerEmail = customer1TestEmail;
        const customerName = 'Customer 2';

        const tx = fpisContract.createCustomer(customerEmail, customerName);
        await expect(tx).to.be.revertedWith('Email already exists');
    });

    it('Should fail to create a customer with empty email', async () => {
        const customerEmail = '';
        const customerName = 'Customer 3';

        const tx = fpisContract.createCustomer(customerEmail, customerName);
        await expect(tx).to.be.revertedWith('Customer email cannot be empty');
    });

    it('Should fail to create a customer with empty email', async () => {
        const customerEmail = 'customer@example.com';
        const customerName = '';

        const tx = fpisContract.createCustomer(customerEmail, customerName);
        await expect(tx).to.be.revertedWith('Customer name cannot be empty');
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

    it('Should fail to create a product with an existing productID', async () => {
        const productID = '123';
        const model = 'New Model';
        const description = 'New Description';
        const manufactoryEmail = manufactoryTestEmail;
        const productionDate = '2023-09-25';

        const tx = fpisContract.createProduct(
            productID,
            model,
            description,
            manufactoryEmail,
            productionDate
        );
        await expect(tx).to.be.revertedWith('Product with the same ID already exists');
    });

    it('Should fail to create a product with an empty productID', async () => {
        const productID = '';
        const model = 'Model 123';
        const description = 'Description 123';
        const manufactoryEmail = manufactoryTestEmail;
        const productionDate = '2023-09-24';

        const tx = fpisContract.createProduct(
            productID,
            model,
            description,
            manufactoryEmail,
            productionDate
        );
        await expect(tx).to.be.revertedWith('ProductID cannot be empty');
    });

    it('Should fail to create a product with an empty model', async () => {
        const productID = '456';
        const model = '';
        const description = 'Description 456';
        const manufactoryEmail = manufactoryTestEmail;
        const productionDate = '2023-09-25';

        const tx = fpisContract.createProduct(
            productID,
            model,
            description,
            manufactoryEmail,
            productionDate
        );
        await expect(tx).to.be.revertedWith('Model cannot be empty');
    });

    it('Should move a product to a retailer', async () => {
        const productID = '123';
        const retailerEmail = retailerTestEmail;
        const movingDate = '2023-09-24';

        const tx = await fpisContract.moveToRetailer(productID, retailerEmail, movingDate);
        await tx.wait();

        const product = await fpisContract.getProductDetail(productID);

        expect(product[3]).to.equal(retailerEmail);
        const history = product[5];
        const lastHistoryItem = history[history.length - 1];
        expect(lastHistoryItem.action).to.equal('Moved to Retailer');
        expect(lastHistoryItem.details).to.equal(`Retail Email: ${retailerEmail}`);
        expect(lastHistoryItem.date).to.equal(movingDate);
    });

    it('Should not move a product to a non-existent retailer', async () => {
        const productID = '456';
        const nonExistentRetailerEmail = 'nonexistent@example.com';
        const movingDate = '2023-09-25';

        await fpisContract.createProduct(
            productID,
            'Model 456',
            'Description 456',
            manufactoryTestEmail,
            '2023-09-24'
        );

        const tx = fpisContract.moveToRetailer(productID, nonExistentRetailerEmail, movingDate);

        await expect(tx).to.be.revertedWith('Retailer does not exist');
    });

    it('Should sell a product to a customer', async () => {
        const productID = '123';
        const retailerEmail = retailerTestEmail;
        const customerEmail = customer1TestEmail;
        const saleDate = '2023-09-25';

        const tx = await fpisContract.sellToFirstCustomer(productID, retailerEmail, customerEmail, saleDate);
        await tx.wait();

        const product = await fpisContract.getProductDetail(productID);
        const productsOfCustomer = await fpisContract.getProductsByCustomer(customerEmail);

        expect(product[4]).to.equal(customerEmail);
        expect(product[5].length).to.equal(3);
        expect(productsOfCustomer.length).to.equal(1);
        expect(productsOfCustomer[0]).to.equal(productID);
    });

    it('Should not sell a product that does not exist', async () => {
        const productID = 'nonExistentProduct';
        const retailerEmail = retailerTestEmail;
        const customerEmail = customer1TestEmail;
        const saleDate = '2023-09-25';

        const tx = fpisContract.sellToFirstCustomer(productID, retailerEmail, customerEmail, saleDate);

        await expect(tx).to.be.revertedWith('Product does not exist');
    });

    it('Should not move a product that is already sold', async () => {
        const productID = '123';
        const retailerEmail = retailerTestEmail;
        const movingDate = '2023-09-26';

        const tx = fpisContract.moveToRetailer(productID, retailerEmail, movingDate);

        await expect(tx).to.be.revertedWith('Product is already sold');
    });

    it('Should not sell a product to a non-existent customer', async () => {
        const productID = '619';
        const retailerEmail = retailerTestEmail;
        const nonExistentCustomerEmail = 'nonexistent@example.com';
        const saleDate = '2023-09-26';

        await fpisContract.createProduct(
            productID,
            'Model 456',
            'Description 456',
            manufactoryTestEmail,
            '2023-09-24'
        );

        await fpisContract.moveToRetailer(productID, retailerEmail, '2023-09-24');

        const tx = fpisContract.sellToFirstCustomer(productID, retailerEmail, nonExistentCustomerEmail, saleDate);

        await expect(tx).to.be.revertedWith('Customer does not exist');
    });

    it('Should not sell a product that is already sold', async () => {
        const productID = '789';
        const retailerEmail = retailerTestEmail;
        const customerEmail = customer1TestEmail;
        const saleDate = '2023-09-27';

        await fpisContract.createProduct(
            productID,
            'Model 789',
            'Description 789',
            manufactoryTestEmail,
            '2023-09-24'
        );

        await fpisContract.moveToRetailer(productID, retailerEmail, '2023-09-24');
        await fpisContract.sellToFirstCustomer(productID, retailerEmail, customerEmail, '2023-09-25');

        const newCustomerEmail = customer2TestEmail;
        const tx = fpisContract.sellToFirstCustomer(productID, retailerEmail, newCustomerEmail, saleDate);

        await expect(tx).to.be.revertedWith('Product is already sold');
    });

    it('Should change customer for a product', async () => {
        const productID = '123';
        const oldCustomerEmail = customer1TestEmail;
        const newCustomerEmail = customer2TestEmail;
        const changeDate = '2023-09-26';

        await fpisContract.createCustomer(newCustomerEmail, 'Customer 2');
        const tx = await fpisContract.changeCustomer(productID, oldCustomerEmail, newCustomerEmail, changeDate);
        await tx.wait();

        const product = await fpisContract.getProductDetail(productID);
        const productsOfOldCustomer = await fpisContract.getProductsByCustomer(oldCustomerEmail);
        const productsOfNewCustomer = await fpisContract.getProductsByCustomer(newCustomerEmail);

        expect(product[4]).to.equal(newCustomerEmail);
        expect(productsOfOldCustomer).to.not.include(productID);
        expect(productsOfNewCustomer[0]).to.equal(productID);
    });

    it('Should not change a product that does not exist', async () => {
        const productID = 'nonexistent123';
        const oldCustomerEmail = customer1TestEmail;
        const newCustomerEmail = customer2TestEmail;
        const changeDate = '2023-09-26';

        const tx = fpisContract.changeCustomer(productID, oldCustomerEmail, newCustomerEmail, changeDate);

        await expect(tx).to.be.revertedWith('Product does not exist');
    });

    it('Should not change customer for a product with status not equal to 1', async () => {
        const productID = '777';
        const oldCustomerEmail = customer1TestEmail;
        const newCustomerEmail = customer2TestEmail;
        const changeDate = '2023-09-26';

        const createProductTx = await fpisContract.createProduct(
            productID,
            'Model 777',
            'Description 777',
            manufactoryTestEmail,
            '2023-09-24'
        );
        await createProductTx.wait();

        const tx = fpisContract.changeCustomer(productID, oldCustomerEmail, newCustomerEmail, changeDate);

        await expect(tx).to.be.revertedWith('Product status must be 1 to change customer');
    });

    it('Should not change customer if old customer does not exist', async () => {
        const productID = '777';
        const oldCustomerEmail = 'nonExistentCustomerEmail';
        const newCustomerEmail = customer2TestEmail;
        const changeDate = '2023-09-26';

        const tx = fpisContract.changeCustomer(productID, oldCustomerEmail, newCustomerEmail, changeDate);

        await expect(tx).to.be.revertedWith('Old customer does not exist');
    });

    it('Should not change customer if new customer does not exist', async () => {
        const productID = '777';
        const oldCustomerEmail = customer1TestEmail;
        const newCustomerEmail = 'nonExistentCustomerEmail';
        const changeDate = '2023-09-26';

        const tx = fpisContract.changeCustomer(productID, oldCustomerEmail, newCustomerEmail, changeDate);

        await expect(tx).to.be.revertedWith('New customer does not exist');
    });

    it('should not allow changing customer if the caller is not the current owner', async () => {
        const productID = '888';
        const manufactoryEmail = manufactoryTestEmail;
        const retailerEmail = retailerTestEmail;
        const oldCustomerEmail = customer1TestEmail;
        const newCustomerEmail = customer2TestEmail;
        const changeDate = '2023-09-26';

        await fpisContract.createProduct(productID, 'Model 888', 'Description 888', manufactoryEmail, '2023-09-25');
        await fpisContract.moveToRetailer(productID, retailerEmail, '2023-09-25');
        await fpisContract.sellToFirstCustomer(productID, retailerEmail, oldCustomerEmail, '2023-09-25');

        const tx = fpisContract.changeCustomer(productID, newCustomerEmail, oldCustomerEmail, changeDate);
        await expect(tx).to.be.revertedWith('Only the current owner can change the customer');

        const product= await fpisContract.getProductDetail(productID);
        expect(product[4]).to.equal(oldCustomerEmail);
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
        expect(products.length).to.equal(4);
        expect(productIds.length).to.equal(4);
    });
});
