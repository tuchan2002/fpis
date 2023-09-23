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
    string date;
  }

  struct Manufactory {
    string name;
    string email;
  }

  struct Retailer {
    string name;
    string email;
  }

  struct Customer {
    string name;
    string email;
    string phone_number;
    string[] products;
    bool isExist;
  }

  mapping (string => Product) private productList;
  mapping (string => Manufactory) private manufactoryList;
  mapping (string => Retailer) private retailerList;
  mapping (string => Customer) private customerList;

  string[] private productIds;

  receive() external payable {}

  function createProduct(string memory _productID, string memory _model, string memory _description, string memory _manufactoryEmail, string memory _productionDate) public payable returns (bool)  {
    Product storage newProduct = productList[_productID];
    newProduct.model = _model;
    newProduct.description = _description;
    newProduct.manufactoryEmail = _manufactoryEmail;

    HistoryItem memory historyItem;
    historyItem.timestamp = block.timestamp;
    historyItem.action = "Manufactured";
    historyItem.details = string(abi.encodePacked("Manufactory Email: ", _manufactoryEmail));
    historyItem.date = _productionDate;
    newProduct.history.push(historyItem);

    productList[_productID] = newProduct;
    productIds.push(_productID);

    return true;
    
  }

  function moveToRetailer(string memory _productID, string memory _retailerEmail, string memory _movingDate) public payable returns (bool) {
    Product storage product = productList[_productID];
    product.retailerEmail = _retailerEmail;

    HistoryItem memory historyItem;
    historyItem.timestamp = block.timestamp;
    historyItem.action = "Moved to Retailer";
    historyItem.details = string(abi.encodePacked("Retail Email: ", _retailerEmail));
    historyItem.date = _movingDate;
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
          historyItem.details = string(abi.encodePacked("Customer Email: ", _customerEmail));
          historyItem.date = _saleDate;
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
          historyItem.details = string(abi.encodePacked("Old Customer: ", _oldCustomerEmail, ", New Customer: ", _newCustomerEmail));
          historyItem.date = _changeDate;
          product.history.push(historyItem);

          newCustomer.products.push(_productID);
          removeElement(i, oldCustomer.products);

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

  function getProductsByManufactory(string memory _manufactoryEmail) public view returns (Product[] memory, string[] memory) {
    uint256 matchingProductCount = 0;
    
    for (uint i = 0; i < productIds.length; i++) {
      string memory productId = productIds[i];
      if (compareTwoStrings(productList[productId].manufactoryEmail, _manufactoryEmail)) {
          matchingProductCount++;
      }
    }
    
    Product[] memory matchingProducts = new Product[](matchingProductCount);
    string[] memory matchingProductIds = new string[](matchingProductCount);
    uint256 currentIndex = 0;

    for (uint i = 0; i < productIds.length; i++) {
      string memory productId = productIds[i];
      if (compareTwoStrings(productList[productId].manufactoryEmail, _manufactoryEmail)) {
        matchingProducts[currentIndex] = productList[productId];
        matchingProductIds[currentIndex] = productId;
        currentIndex++;
      }
    }

    return (matchingProducts, matchingProductIds);
  }

  function getProductsByRetailer(string memory _retailerEmail) public view returns (Product[] memory, string[] memory) {
    uint256 matchingProductCount = 0;
    
    for (uint i = 0; i < productIds.length; i++) {
      string memory productId = productIds[i];
      if (compareTwoStrings(productList[productId].retailerEmail, _retailerEmail)) {
          matchingProductCount++;
      }
    }
    
    Product[] memory matchingProducts = new Product[](matchingProductCount);
    string[] memory matchingProductIds = new string[](matchingProductCount);
    uint256 currentIndex = 0;

    for (uint i = 0; i < productIds.length; i++) {
      string memory productId = productIds[i];
      if (compareTwoStrings(productList[productId].retailerEmail, _retailerEmail)) {
        matchingProducts[currentIndex] = productList[productId];
        matchingProductIds[currentIndex] = productId;
        currentIndex++;
      }
    }

    return (matchingProducts, matchingProductIds);
  }

  function getProductDetail(string memory _productID) public view returns (string memory, string memory, string memory, string memory, string memory,  HistoryItem[] memory) {
    return (productList[_productID].model, productList[_productID].description, productList[_productID].manufactoryEmail, productList[_productID].retailerEmail, productList[_productID].customerEmail, productList[_productID].history);
  }

  function getCustomerDetail(string memory _customerEmail) public view returns (string memory, string memory) {
    return (customerList[_customerEmail].name, customerList[_customerEmail].phone_number);
  }

  function getRetailerDetail(string memory _retailerEmail) public view returns (string memory) {
    return (retailerList[_retailerEmail].name);
  }

  function getManafactorDetail(string memory _manufactorEmail) public view returns (string memory) {
    return (manufactoryList[_manufactorEmail].name);
  }

  function getProductsByCustomer(string memory _customerEmail) public view returns(string[] memory) {
    return customerList[_customerEmail].products;
  }

  function createManufactory(string memory _manufactorEmail, string memory _manufactorName) public payable returns (bool) {
    Retailer memory newManufactor;
    newManufactor.name = _manufactorName;
    retailerList[_manufactorEmail] = newManufactor;
    return true;
  }

  function createRetailer(string memory _retailerEmail, string memory _retailerName) public payable returns (bool) {
    Retailer memory newRetailer;
    newRetailer.name = _retailerName;
    retailerList[_retailerEmail] = newRetailer;
    return true;
  }

  function createCustomer(string memory _customerEmail, string memory _name, string memory _phone_number) public payable returns (bool) {
    if (customerList[_customerEmail].isExist) {
      return false;
    }

    Customer memory newCustomer;
    newCustomer.name = _name;
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

    array.pop();
    return true;
  }
}