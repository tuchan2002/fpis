const { Web3 } = require("web3");

const abi = [
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
const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const contract = new web3.eth.Contract(abi, contractAddress);

let accountAddress = "";
web3.eth.getAccounts().then((accounts) => {
  accountAddress = accounts[0];
});

module.exports = {
  web3,
  contract,
  accountAddress,
};
