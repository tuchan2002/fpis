require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Web3 } = require("web3");
const appRoute = require("./routes");
const db = require("./models");

const fpisAbi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_productID",
        type: "string",
      },
      {
        internalType: "string",
        name: "_oldCustomerEmail",
        type: "string",
      },
      {
        internalType: "string",
        name: "_newCustomerEmail",
        type: "string",
      },
    ],
    name: "changeCustomer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_customerEmail",
        type: "string",
      },
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_location",
        type: "string",
      },
      {
        internalType: "string",
        name: "_phone_number",
        type: "string",
      },
    ],
    name: "createCustomer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_manufactorEmail",
        type: "string",
      },
      {
        internalType: "string",
        name: "_manufactorName",
        type: "string",
      },
      {
        internalType: "string",
        name: "_manufactorLocation",
        type: "string",
      },
    ],
    name: "createManufactor",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_productID",
        type: "string",
      },
      {
        internalType: "string",
        name: "_model",
        type: "string",
      },
      {
        internalType: "string",
        name: "_description",
        type: "string",
      },
      {
        internalType: "string",
        name: "_manufactoryEmail",
        type: "string",
      },
    ],
    name: "createProduct",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_retailerEmail",
        type: "string",
      },
      {
        internalType: "string",
        name: "_retailerName",
        type: "string",
      },
      {
        internalType: "string",
        name: "_retailerLocation",
        type: "string",
      },
    ],
    name: "createRetailer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_customerEmail",
        type: "string",
      },
    ],
    name: "getCustomerDetail",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_manufactorEmail",
        type: "string",
      },
    ],
    name: "getManafactorDetail",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_productID",
        type: "string",
      },
    ],
    name: "getProductDetail",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_customerEmail",
        type: "string",
      },
    ],
    name: "getProductsByCustomer",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_retailerEmail",
        type: "string",
      },
    ],
    name: "getRetailerDetail",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_productID",
        type: "string",
      },
      {
        internalType: "string",
        name: "_retailerEmail",
        type: "string",
      },
    ],
    name: "moveToRetailer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_productID",
        type: "string",
      },
      {
        internalType: "string",
        name: "_retailerEmail",
        type: "string",
      },
      {
        internalType: "string",
        name: "_customerEmail",
        type: "string",
      },
    ],
    name: "sellToFirstCustomer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
];

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const fpisContract = new web3.eth.Contract(fpisAbi);
console.log(fpisContract);

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1", appRoute);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Sever is listening on port: ${port}`);
});
