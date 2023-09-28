/* eslint-disable */
const { expect } = require('chai');
const { it, describe, before } = require('mocha');
const { ethers } = require('hardhat');
/* eslint-enable */
/* eslint-disable no-unused-expressions */

describe('Smart Contract Deployment', () => {
    it('Should deploy the contract', async () => {
        const fpisContract = await ethers.deployContract('FPIS');

        const customerEmail = 'customer1@gmail.com';
        const customerName = 'customer 1';
        const tx = await fpisContract.createCustomer(customerEmail, customerName);
        await tx.wait();

        const customerDetail = await fpisContract.getCustomerDetail(customerEmail);
        expect(customerDetail[0]).to.equal(customerName);
    });
});

describe('Manufactory Creation', () => {
    const manufactory1TestEmail = 'manufactory1@example.com';
    let fpisContract;

    before(async () => {
        fpisContract = await ethers.deployContract('FPIS');
    });

    it('Should create a manufactory', async () => {
        const manufactoryEmail = manufactory1TestEmail;
        const manufactoryName = 'Manufactory 1';

        const tx = await fpisContract.createManufactory(manufactoryEmail, manufactoryName);
        await tx.wait();

        const manufactoryDetail = await fpisContract.getManufactoryDetail(manufactoryEmail);
        expect(manufactoryDetail[0]).to.equal(manufactoryName);
    });

    it('Should fail to create a manufactory with an existing email', async () => {
        const manufactoryEmail = manufactory1TestEmail;
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
        const manufactoryEmail = 'manufactory2@example.com';
        const manufactoryName = '';

        const tx = fpisContract.createManufactory(manufactoryEmail, manufactoryName);
        await expect(tx).to.be.revertedWith('Manufactory name cannot be empty');
    });
});

describe('Manufactory Removal', () => {
    const manufactory1TestEmail = 'manufactory1@example.com';
    let fpisContract;

    before(async () => {
        fpisContract = await ethers.deployContract('FPIS');

        await fpisContract.createManufactory(manufactory1TestEmail, 'Manufactory 1');
    });

    it('Should remove a manufactory', async () => {
        const tx = await fpisContract.removeManufactory(manufactory1TestEmail);
        await tx.wait();

        const manufactoryDetail = await fpisContract.getManufactoryDetail(manufactory1TestEmail);
        expect(manufactoryDetail[0]).to.be.empty;
    });

    it('Should fail to remove a non-existing manufactory', async () => {
        const tx = fpisContract.removeManufactory('nonexistent@example.com');

        await expect(tx).to.be.revertedWith('Manufactory does not exist');
    });
});

describe('Retailer Creation', () => {
    const retailer1TestEmail = 'retailer1@example.com';
    let fpisContract;

    before(async () => {
        fpisContract = await ethers.deployContract('FPIS');
    });

    it('Should create a retailer', async () => {
        const retailerEmail = retailer1TestEmail;
        const retailerName = 'Retailer 1';

        const tx = await fpisContract.createRetailer(retailerEmail, retailerName);
        await tx.wait();

        const retailerDetail = await fpisContract.getRetailerDetail(retailerEmail);
        expect(retailerDetail[0]).to.equal(retailerName);
    });

    it('Should fail to create a retailer with an existing email', async () => {
        const retailerEmail = retailer1TestEmail;
        const retailerName = 'Retailer 2';

        const tx = fpisContract.createRetailer(retailerEmail, retailerName);
        await expect(tx).to.be.revertedWith('Email already exists');
    });

    it('Should fail to create a retailer with empty email', async () => {
        const retailerEmail = '';
        const retailerName = 'Retailer 2';

        const tx = fpisContract.createRetailer(retailerEmail, retailerName);
        await expect(tx).to.be.revertedWith('Retailer email cannot be empty');
    });

    it('Should fail to create a retailer with empty name', async () => {
        const retailerEmail = 'retailer2@example.com';
        const retailerName = '';

        const tx = fpisContract.createRetailer(retailerEmail, retailerName);
        await expect(tx).to.be.revertedWith('Retailer name cannot be empty');
    });
});

describe('Retailer Removal', () => {
    const retailer1TestEmail = 'retailer1@example.com';
    let fpisContract;

    before(async () => {
        fpisContract = await ethers.deployContract('FPIS');

        await fpisContract.createRetailer(retailer1TestEmail, 'Retailer 1');
    });

    it('Should remove a retailer', async () => {
        const tx = await fpisContract.removeRetailer(retailer1TestEmail);
        await tx.wait(); 
        
        const retailerDetail = await fpisContract.getRetailerDetail(retailer1TestEmail);
        expect(retailerDetail[0]).to.be.empty;
    });

    it('Should fail to remove a non-existing retailer', async () => {
        const tx = fpisContract.removeRetailer('nonexistent@example.com');

        await expect(tx).to.be.revertedWith('Retailer does not exist');
    });
});

describe('Customer Creation', () => {
    const customer1TestEmail = 'customer1@example.com';
    const customer2TestEmail = 'customer2@example.com';
    let fpisContract;

    before(async () => {
        fpisContract = await ethers.deployContract('FPIS');
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
        const customerName = 'Customer 2';

        const tx = fpisContract.createCustomer(customerEmail, customerName);
        await expect(tx).to.be.revertedWith('Customer email cannot be empty');
    });

    it('Should fail to create a customer with empty name', async () => {
        const customerEmail = customer2TestEmail;
        const customerName = '';

        const tx = fpisContract.createCustomer(customerEmail, customerName);
        await expect(tx).to.be.revertedWith('Customer name cannot be empty');
    });
});

describe('Customer Removal', () => {
    const customer1TestEmail = 'customer1@example.com';
    let fpisContract;

    before(async () => {
        fpisContract = await ethers.deployContract('FPIS');

        await fpisContract.createCustomer(customer1TestEmail, 'Customer 1');
    });

    it('Should remove a customer', async () => {
        const tx = await fpisContract.removeCustomer(customer1TestEmail);
        await tx.wait(); 

        const customerDetail = await fpisContract.getCustomerDetail(customer1TestEmail);
        expect(customerDetail[0]).to.be.empty;
    });

    it('Should fail to remove a non-existing customer', async () => {
        const tx = fpisContract.removeCustomer('nonexistent@example.com');

        await expect(tx).to.be.revertedWith('Customer does not exist');
    });
});

describe('Product Creation', () => {
    const manufactory1TestEmail = 'manufactory1@example.com';
    const retailer1TestEmail = 'retailer1@example.com';
    const customer1TestEmail = 'customer1@example.com';
    const customer2TestEmail = 'customer2@example.com';
    let fpisContract;

    before(async () => {
        fpisContract = await ethers.deployContract('FPIS');

        await fpisContract.createManufactory(manufactory1TestEmail, 'Manufactory 1');
        await fpisContract.createRetailer(retailer1TestEmail, 'Retailer 1');
        await fpisContract.createCustomer(customer1TestEmail, 'Customer 1');
        await fpisContract.createCustomer(customer2TestEmail, 'Customer 2');
    });

    it('Should create a product', async () => {
        const productID = '123';
        const model = 'Model 123';
        const manufactoryEmail = manufactory1TestEmail;
        const productionDate = '2023-09-25';
        const imageURL = 'https://i.pinimg.com/564x/76/0b/4e/760b4e14921fc52336ce43ad39757f41.jpg';

        const tx = await fpisContract.createProduct(
            productID,
            model,
            manufactoryEmail,
            productionDate,
            imageURL
        );

        await tx.wait();

        const productDetail = await fpisContract.getProductDetail(productID);
        const products = await fpisContract.getAllProducts();

        expect(productDetail[0]).to.equal(model);
        expect(productDetail[1]).to.equal(manufactoryEmail);
        expect(products[1][0]).to.equal(productID);
    });

    it('Should fail to create a product with an existing productID', async () => {
        const productID = '123';
        const model = 'New Model';
        const manufactoryEmail = manufactory1TestEmail;
        const productionDate = '2023-09-25';
        const imageURL = 'https://i.pinimg.com/564x/76/0b/4e/760b4e14921fc52336ce43ad39757f41.jpg';

        const tx = fpisContract.createProduct(
            productID,
            model,
            manufactoryEmail,
            productionDate,
            imageURL
        );
        await expect(tx).to.be.revertedWith('Product with the same ID already exists');
    });

    it('Should fail to create a product with an empty productID', async () => {
        const productID = '';
        const model = 'Model 123';
        const manufactoryEmail = manufactory1TestEmail;
        const productionDate = '2023-09-25';
        const imageURL = 'https://i.pinimg.com/564x/76/0b/4e/760b4e14921fc52336ce43ad39757f41.jpg';

        const tx = fpisContract.createProduct(
            productID,
            model,
            manufactoryEmail,
            productionDate,
            imageURL
        );
        await expect(tx).to.be.revertedWith('ProductID cannot be empty');
    });

    it('Should fail to create a product with an empty model', async () => {
        const productID = '456';
        const model = '';
        const manufactoryEmail = manufactory1TestEmail;
        const productionDate = '2023-09-25';
        const imageURL = 'https://i.pinimg.com/564x/76/0b/4e/760b4e14921fc52336ce43ad39757f41.jpg';

        const tx = fpisContract.createProduct(
            productID,
            model,
            manufactoryEmail,
            productionDate,
            imageURL
        );
        await expect(tx).to.be.revertedWith('Model cannot be empty');
    });

    it('Should fail to create a product with a non-existent manufactory', async () => {
        const productID = '456';
        const model = 'Model 456';
        const nonExistentManufactoryEmail = 'nonexistent@example.com';
        const productionDate = '2023-09-25';
        const imageURL = 'https://i.pinimg.com/564x/76/0b/4e/760b4e14921fc52336ce43ad39757f41.jpg';

        const tx = fpisContract.createProduct(
            productID,
            model,
            nonExistentManufactoryEmail,
            productionDate,
            imageURL
        );

        await expect(tx).to.be.revertedWith('Manufactory does not exist');
    });
});

describe('Product Movements', () => {
    const manufactory1TestEmail = 'manufactory1@example.com';
    const retailer1TestEmail = 'retailer1@example.com';
    const customer1TestEmail = 'customer1@example.com';
    const customer2TestEmail = 'customer2@example.com';
    let fpisContract;

    before(async () => {
        fpisContract = await ethers.deployContract('FPIS');

        await fpisContract.createManufactory(manufactory1TestEmail, 'Manufactory 1');
        await fpisContract.createRetailer(retailer1TestEmail, 'Retailer 1');
        await fpisContract.createCustomer(customer1TestEmail, 'Customer 1');
        await fpisContract.createCustomer(customer2TestEmail, 'Customer 2');
    });

    it('Should move a product to a retailer', async () => {
        const productID = '123';
        const manufactoryEmail = manufactory1TestEmail;
        const retailerEmail = retailer1TestEmail;
        const movingDate = '2023-09-25';
        const imageURL = 'https://i.pinimg.com/564x/76/0b/4e/760b4e14921fc52336ce43ad39757f41.jpg';

        await fpisContract.createProduct(productID, 'Model 123', manufactoryEmail, '2023-09-25', imageURL);
        const tx = await fpisContract.moveToRetailer(productID, retailerEmail, movingDate);
        await tx.wait();

        const product = await fpisContract.getProductDetail(productID);

        expect(product[2]).to.equal(retailerEmail);
        const history = product[4];
        const lastHistoryItem = history[history.length - 1];
        expect(lastHistoryItem.action).to.equal('Moved to Retailer');
        expect(lastHistoryItem.details).to.equal(`Retail Email: ${retailerEmail}`);
        expect(lastHistoryItem.date).to.equal(movingDate);
    });

    it('Should not move a product that does not exist', async () => {
        const productID = 'nonExistentProduct';
        const retailerEmail = retailer1TestEmail;
        const movingDate = '2023-09-25';

        const tx = fpisContract.moveToRetailer(productID, retailerEmail, movingDate);

        await expect(tx).to.be.revertedWith('Product does not exist');
    });

    it('Should not move a product to a non-existent retailer', async () => {
        const productID = '456';
        const nonExistentRetailerEmail = 'nonexistent@example.com';
        const movingDate = '2023-09-25';
        const imageURL = 'https://i.pinimg.com/564x/76/0b/4e/760b4e14921fc52336ce43ad39757f41.jpg';

        await fpisContract.createProduct(
            productID,
            'Model 456',
            manufactory1TestEmail,
            '2023-09-25',
            imageURL
        );

        const tx = fpisContract.moveToRetailer(productID, nonExistentRetailerEmail, movingDate);

        await expect(tx).to.be.revertedWith('Retailer does not exist');
    });
});

describe('Product Sales', () => {
    const manufactory1TestEmail = 'manufactory1@example.com';
    const retailer1TestEmail = 'retailer1@example.com';
    const customer1TestEmail = 'customer1@example.com';
    const customer2TestEmail = 'customer2@example.com';
    let fpisContract;

    before(async () => {
        fpisContract = await ethers.deployContract('FPIS');

        await fpisContract.createManufactory(manufactory1TestEmail, 'Manufactory 1');
        await fpisContract.createRetailer(retailer1TestEmail, 'Retailer 1');
        await fpisContract.createCustomer(customer1TestEmail, 'Customer 1');
        await fpisContract.createCustomer(customer2TestEmail, 'Customer 2');
    });

    it('Should sell a product to a customer', async () => {
        const productID = '123';
        const retailerEmail = retailer1TestEmail;
        const customerEmail = customer1TestEmail;
        const saleDate = '2023-09-25';
        const imageURL = 'https://i.pinimg.com/564x/76/0b/4e/760b4e14921fc52336ce43ad39757f41.jpg';

        await fpisContract.createProduct(productID, 'Model 123', manufactory1TestEmail, '2023-09-25', imageURL);
        await fpisContract.moveToRetailer(productID, retailerEmail, '2023-09-25');
        const tx = await fpisContract.sellToCustomer(productID, retailerEmail, customerEmail, saleDate);
        await tx.wait();

        const product = await fpisContract.getProductDetail(productID);
        const productsOfCustomer = await fpisContract.getProductsByCustomer(customerEmail);

        expect(product[3]).to.equal(customerEmail);
        expect(product[4].length).to.equal(3);
        expect(productsOfCustomer.length).to.equal(1);
        expect(productsOfCustomer[0]).to.equal(productID);
    });

    it('Should not sell a product that does not exist', async () => {
        const productID = 'nonExistentProduct';
        const retailerEmail = retailer1TestEmail;
        const customerEmail = customer1TestEmail;
        const saleDate = '2023-09-25';

        const tx = fpisContract.sellToCustomer(productID, retailerEmail, customerEmail, saleDate);

        await expect(tx).to.be.revertedWith('Product does not exist');
    });

    it('Should not move a product that is already sold', async () => {
        const productID = '123';
        const retailerEmail = retailer1TestEmail;
        const movingDate = '2023-09-25';

        const tx = fpisContract.moveToRetailer(productID, retailerEmail, movingDate);

        await expect(tx).to.be.revertedWith('Product is already sold');
    });

    it('Should not sell a product to a non-existent customer', async () => {
        const productID = '619';
        const retailerEmail = retailer1TestEmail;
        const nonExistentCustomerEmail = 'nonexistent@example.com';
        const saleDate = '2023-09-25';
        const imageURL = 'https://i.pinimg.com/564x/76/0b/4e/760b4e14921fc52336ce43ad39757f41.jpg';

        await fpisContract.createProduct(
            productID,
            'Model 456',
            manufactory1TestEmail,
            '2023-09-25',
            imageURL
        );

        await fpisContract.moveToRetailer(productID, retailerEmail, '2023-09-25');

        const tx = fpisContract.sellToCustomer(productID, retailerEmail, nonExistentCustomerEmail, saleDate);

        await expect(tx).to.be.revertedWith('Customer does not exist');
    });

    it('Should not sell a product that is already sold', async () => {
        const productID = '789';
        const retailerEmail = retailer1TestEmail;
        const customerEmail = customer1TestEmail;
        const saleDate = '2023-09-27';
        const imageURL = 'https://i.pinimg.com/564x/76/0b/4e/760b4e14921fc52336ce43ad39757f41.jpg';

        await fpisContract.createProduct(
            productID,
            'Model 789',
            manufactory1TestEmail,
            '2023-09-25',
            imageURL
        );

        await fpisContract.moveToRetailer(productID, retailerEmail, '2023-09-25');
        await fpisContract.sellToCustomer(productID, retailerEmail, customerEmail, '2023-09-25');

        const newCustomerEmail = customer2TestEmail;
        const tx = fpisContract.sellToCustomer(productID, retailerEmail, newCustomerEmail, saleDate);

        await expect(tx).to.be.revertedWith('Product is already sold');
    });
});

describe('Customer Changes', () => {
    const manufactory1TestEmail = 'manufactory1@example.com';
    const retailer1TestEmail = 'retailer1@example.com';
    const customer1TestEmail = 'customer1@example.com';
    const customer2TestEmail = 'customer2@example.com';
    let fpisContract;

    before(async () => {
        fpisContract = await ethers.deployContract('FPIS');

        await fpisContract.createManufactory(manufactory1TestEmail, 'Manufactory 1');
        await fpisContract.createRetailer(retailer1TestEmail, 'Retailer 1');
        await fpisContract.createCustomer(customer1TestEmail, 'Customer 1');
        await fpisContract.createCustomer(customer2TestEmail, 'Customer 2');
    });

    it('Should change customer for a product', async () => {
        const productID = '123';
        const retailerEmail = retailer1TestEmail;
        const oldCustomerEmail = customer1TestEmail;
        const newCustomerEmail = customer2TestEmail;
        const changeDate = '2023-09-25';
        const imageURL = 'https://i.pinimg.com/564x/76/0b/4e/760b4e14921fc52336ce43ad39757f41.jpg';

        await fpisContract.createProduct(productID, 'Model 123', manufactory1TestEmail, '2023-09-25', imageURL);
        await fpisContract.moveToRetailer(productID, retailerEmail, '2023-09-25');
        await fpisContract.sellToCustomer(productID, retailerEmail, oldCustomerEmail, '2023-09-25');
        const tx = await fpisContract.changeCustomer(productID, oldCustomerEmail, newCustomerEmail, changeDate);
        await tx.wait();

        const product = await fpisContract.getProductDetail(productID);
        const productsOfOldCustomer = await fpisContract.getProductsByCustomer(oldCustomerEmail);
        const productsOfNewCustomer = await fpisContract.getProductsByCustomer(newCustomerEmail);

        expect(product[3]).to.equal(newCustomerEmail);
        expect(productsOfOldCustomer).to.not.include(productID);
        expect(productsOfNewCustomer[0]).to.equal(productID);
    });

    it('Should not change a product that does not exist', async () => {
        const productID = 'nonexistent123';
        const oldCustomerEmail = customer1TestEmail;
        const newCustomerEmail = customer2TestEmail;
        const changeDate = '2023-09-25';

        const tx = fpisContract.changeCustomer(productID, oldCustomerEmail, newCustomerEmail, changeDate);

        await expect(tx).to.be.revertedWith('Product does not exist');
    });

    it('Should not change customer if new customer does not exist', async () => {
        const productID = '456';
        const oldCustomerEmail = customer1TestEmail;
        const newCustomerEmail = 'nonExistentCustomerEmail';
        const changeDate = '2023-09-25';
        const imageURL = 'https://i.pinimg.com/564x/76/0b/4e/760b4e14921fc52336ce43ad39757f41.jpg';

        await fpisContract.createProduct(
            productID,
            'Model 456',
            manufactory1TestEmail,
            '2023-09-25',
            imageURL
        );

        const tx = fpisContract.changeCustomer(productID, oldCustomerEmail, newCustomerEmail, changeDate);

        await expect(tx).to.be.revertedWith('New customer does not exist');
    });

    it('Should not allow changing customer if the caller is not the current owner', async () => {
        const productID = '789';
        const manufactoryEmail = manufactory1TestEmail;
        const retailerEmail = retailer1TestEmail;
        const oldCustomerEmail = customer1TestEmail;
        const newCustomerEmail = customer2TestEmail;
        const changeDate = '2023-09-25';
        const imageURL = 'https://i.pinimg.com/564x/76/0b/4e/760b4e14921fc52336ce43ad39757f41.jpg';

        await fpisContract.createProduct(productID, 'Model 789', manufactoryEmail, '2023-09-25', imageURL);
        await fpisContract.moveToRetailer(productID, retailerEmail, '2023-09-25');
        await fpisContract.sellToCustomer(productID, retailerEmail, oldCustomerEmail, '2023-09-25');
        const tx = fpisContract.changeCustomer(productID, newCustomerEmail, oldCustomerEmail, changeDate);

        await expect(tx).to.be.revertedWith('Only the current owner can change the customer');
    });
});
