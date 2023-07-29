//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract FPIS {
  struct Product {
    string model;
    string description;
    string manufactory;
    string retailer;
    string[] customer;
  }

  struct Manufactory {
    string name;
    string location;
  }

  struct Retailer {
    string name;
    string location;
  }

  struct Customer {
    string name;
    string email;
    string phone_number;
    string location;
  }
}