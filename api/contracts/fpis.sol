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

  function createProduct(string memory _productID, string memory _model, string memory _description, string memory _manufactoryEmail) public payable returns (bool) {
    Product memory newProduct;
    newProduct.model = _model;
    newProduct.description = _description;
    newProduct.manufactoryEmail = _manufactoryEmail;
    productList[_productID] = newProduct;
    return true;
  }

  function moveToRetailer(string memory _productID, string memory _retailerEmail) public payable returns (bool) {
    productList[_productID].retailerEmail = _retailerEmail;
    return true;
  }

  function sellToFirstCustomer(string memory _productID, string memory _retailerEmail, string memory _customerEmail) public payable returns(bool) {
    if (compareTwoStrings(productList[_productID].retailerEmail, _retailerEmail)) {
      if (customerList[_customerEmail].isExist) {
        productList[_productID].customerEmail = _customerEmail;
        productList[_productID].status = 1;
        customerList[_customerEmail].products.push(_productID);

        return true;
      }
    }
    return false;
  }

  function changeCustomer(string memory _productID, string memory _oldCustomerEmail, string memory _newCustomerEmail) public payable returns (bool) {
    console.log(_productID, _oldCustomerEmail, _newCustomerEmail);
    
    Product memory product = productList[_productID];

    Customer memory oldCustomer = customerList[_oldCustomerEmail];
    uint numOfProductsOldCustomer = customerList[_oldCustomerEmail].products.length;

    Customer memory newCustomer = customerList[_newCustomerEmail];

    if (oldCustomer.isExist && newCustomer.isExist) {
      for (uint i = 0; i < numOfProductsOldCustomer; i++) {
        if (compareTwoStrings(oldCustomer.products[i], _productID)) {
          if (compareTwoStrings(product.customerEmail, _oldCustomerEmail)) {
            productList[_productID].customerEmail = _newCustomerEmail;
          }

          for (uint j = 0; j < numOfProductsOldCustomer; j++) {
            if (compareTwoStrings(customerList[_oldCustomerEmail].products[j], _productID)) {
              removeElement(j, customerList[_oldCustomerEmail].products);
              customerList[_newCustomerEmail].products.push(_productID);

              return true;
            }
          }

          break;
        }
      }
    }
    return false;
  }

  function getProductDetail(string memory _productID) public view returns (string memory, string memory, string memory, string memory) {
    return (productList[_productID].model, productList[_productID].description, productList[_productID].retailerEmail, productList[_productID].customerEmail);
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