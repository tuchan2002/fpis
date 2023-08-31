const { Web3 } = require('web3');
const fs = require('fs');
const path = require('path');

console.log(process.env.NODE_ENV);

const abi = JSON.parse(fs.readFileSync(path.join(__dirname, '..', "shared_folder/contract-abi.json"), 'utf8'));
const contractAddress = fs.readFileSync(path.join(__dirname, '..', "shared_folder/contract-address.txt"), 'utf8');

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.NODE_ENV === "production" ? 'https://data-seed-prebsc-1-s1.binance.org:8545' : 'http://localhost:8545'));
const contract = new web3.eth.Contract(abi, contractAddress);

console.log("web3: ",web3);
console.log("contract: ",contract);

module.exports = {
    web3,
    contract
};
