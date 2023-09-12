const { Web3 } = require('web3');
const fs = require('fs');
const path = require('path');


const contractInfo = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'contract-info.json'), 'utf8'));
const contractAddress = contractInfo.contractAddress
const contractABI = contractInfo.contractABI

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.NODE_ENV === 'production' ? 'https://data-seed-prebsc-1-s1.binance.org:8545' : 'http://localhost:8545'));
const contract = new web3.eth.Contract(contractABI, contractAddress);

module.exports = {
    web3,
    contract
};
