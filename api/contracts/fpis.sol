//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract FPIS {
  struct Product {
    string model;
    string description;
    string manufactoryEmail;
    string retailerEmail;
    string customerEmail;
    uint status;
    HistoryItem[] history;
  }

  struct HistoryItem {
    uint timestamp;
    string action;
    string details;
  }

  struct Manufactory {
    string name;
    string email;
    string location;
  }

  struct Retailer {
    string name;
    string email;
    string location;
  }

  struct Customer {
    string name;
    string email;
    string phone_number;
    string location;
    string[] products;
    bool isExist;
  }

  mapping (string => Product) private productList;
  mapping (string => Manufactory) private manufactoryList;
  mapping (string => Retailer) private retailerList;
  mapping (string => Customer) private customerList;

  string[] private productIds;

  function createProduct(string memory _productID, string memory _model, string memory _description, string memory _manufactoryEmail, string memory _manufactoryLocation, string memory _productionDate) public payable returns (bool) {
    Product storage newProduct = productList[_productID];
    newProduct.model = _model;
    newProduct.description = _description;
    newProduct.manufactoryEmail = _manufactoryEmail;

    HistoryItem memory historyItem;
    historyItem.timestamp = block.timestamp;
    historyItem.action = "Manufactured";
    historyItem.details = string(abi.encodePacked("Manufactory Location: ", _manufactoryLocation, ", Production Date: ", _productionDate));
    newProduct.history.push(historyItem);

    productList[_productID] = newProduct;

    productIds.push(_productID);

    return true;
  }

  function moveToRetailer(string memory _productID, string memory _retailerEmail, string memory _retailLocation) public payable returns (bool) {
    Product storage product = productList[_productID];
    product.retailerEmail = _retailerEmail;

    HistoryItem memory historyItem;
    historyItem.timestamp = block.timestamp;
    historyItem.action = "Moved to Retailer";
    historyItem.details = string(abi.encodePacked("Retail Location: ", _retailLocation));
    product.history.push(historyItem);

    return true;
  }

  function sellToFirstCustomer(string memory _productID, string memory _retailerEmail, string memory _customerEmail, string memory _saleDate) public payable returns(bool) {
    Product storage product = productList[_productID];
    if (compareTwoStrings(product.retailerEmail, _retailerEmail)) {
      if (compareTwoStrings(product.customerEmail, "")) {
        if (customerList[_customerEmail].isExist) {
          product.customerEmail = _customerEmail;
          product.status = 1;
          customerList[_customerEmail].products.push(_productID);

          HistoryItem memory historyItem;
          historyItem.timestamp = block.timestamp;
          historyItem.action = "Sold to Customer";
          historyItem.details = string(abi.encodePacked("Customer Email: ", _customerEmail, ", Sale Date: ", _saleDate));
          product.history.push(historyItem);

          return true;
        }
      }
    }
    return false;
  }

  function changeCustomer(string memory _productID, string memory _oldCustomerEmail, string memory _newCustomerEmail, string memory _changeDate) public payable returns (bool) {
    Product storage product = productList[_productID];

    Customer storage oldCustomer = customerList[_oldCustomerEmail];
    Customer storage newCustomer = customerList[_newCustomerEmail];

    if (product.status == 1 && oldCustomer.isExist && newCustomer.isExist) {
      for (uint i = 0; i < oldCustomer.products.length; i++) {
        if (compareTwoStrings(oldCustomer.products[i], _productID)) {
          if (compareTwoStrings(product.customerEmail, _oldCustomerEmail)) {
            product.customerEmail = _newCustomerEmail;
          }

          HistoryItem memory historyItem;
          historyItem.timestamp = block.timestamp;
          historyItem.action = "Changed Customer";
          historyItem.details = string(abi.encodePacked("Old Customer: ", _oldCustomerEmail, ", New Customer: ", _newCustomerEmail, ", Change Date: ", _changeDate));
          product.history.push(historyItem);

          removeElement(i, oldCustomer.products);
          newCustomer.products.push(_productID);

          return true;
        }
      }
    }
    return false;
  }

  function getAllProducts() public view returns (Product[] memory, string[] memory) {
    uint256 numOfProducts = productIds.length;

    Product[] memory products = new Product[](numOfProducts);

    for (uint256 i = 0; i < numOfProducts; i++) {
      products[i] = productList[productIds[i]];
    }

    return (products, productIds);
  }

  function getProductDetail(string memory _productID) public view returns (string memory, string memory, string memory, string memory, string memory,  HistoryItem[] memory) {
    return (productList[_productID].model, productList[_productID].description, productList[_productID].manufactoryEmail, productList[_productID].retailerEmail, productList[_productID].customerEmail, productList[_productID].history);
  }

  function getCustomerDetail(string memory _customerEmail) public view returns (string memory, string memory, string memory) {
    return (customerList[_customerEmail].name, customerList[_customerEmail].phone_number, customerList[_customerEmail].location);
  }

  function getRetailerDetail(string memory _retailerEmail) public view returns (string memory, string memory) {
    return (retailerList[_retailerEmail].name, retailerList[_retailerEmail].location);
  }

  function getManafactorDetail(string memory _manufactorEmail) public view returns (string memory, string memory) {
    return (retailerList[_manufactorEmail].name, retailerList[_manufactorEmail].location);
  }

  function getProductsByCustomer(string memory _customerEmail) public view returns(string[] memory) {
    return customerList[_customerEmail].products;
  }

  function createManufactory(string memory _manufactorEmail, string memory _manufactorName, string memory _manufactorLocation) public payable returns (bool) {
    Retailer memory newManufactor;
    newManufactor.name = _manufactorName;
    newManufactor.location = _manufactorLocation;
    retailerList[_manufactorEmail] = newManufactor;
    return true;
  }

  function createRetailer(string memory _retailerEmail, string memory _retailerName, string memory _retailerLocation) public payable returns (bool) {
    Retailer memory newRetailer;
    newRetailer.name = _retailerName;
    newRetailer.location = _retailerLocation;
    retailerList[_retailerEmail] = newRetailer;
    return true;
  }

  function createCustomer(string memory _customerEmail, string memory _name, string memory _location, string memory _phone_number) public payable returns (bool) {
    if (customerList[_customerEmail].isExist) {
      return false;
    }

    Customer memory newCustomer;
    newCustomer.name = _name;
    newCustomer.location = _location;
    newCustomer.phone_number = _phone_number;
    newCustomer.isExist = true;
    customerList[_customerEmail] = newCustomer;
    return true;
  }

  function compareTwoStrings(string memory str1, string memory str2) internal pure returns (bool) {
    return keccak256(abi.encodePacked(str1)) == keccak256(abi.encodePacked(str2));
  }

  function removeElement(uint index, string[] storage array) internal returns(bool) {
    if (index >= array.length) {
      return false;
    }

    for (uint i = index; i < array.length-1; i++) {
      array[i] = array[i+1];
    }

    delete array[array.length-1];
    return true;
  }
}