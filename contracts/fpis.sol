//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract FPIS {
  struct Product {
    string model;
    string description;
    string manufactory;
    string retailer;
    string[] customers;
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
  }

  mapping (string => Product) private productList;
  mapping (string => Manufactory) private manufactoryList;
  mapping (string => Retailer) private retailerList;
  mapping (string => Customer) private customerList;

  function createProduct(string memory _id, string memory _model, string memory _description) public payable returns (bool) {
    Product memory newProduct;
    newProduct.model = _model;
    newProduct.description = _description;
    productList[_id] = newProduct;
    return true;
  }
}