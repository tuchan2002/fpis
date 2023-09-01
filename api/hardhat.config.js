// eslint-disable-next-line import/no-extraneous-dependencies
require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: '0.8.19',
    networks: {
        bscTestnet: {
            url: 'https://data-seed-prebsc-1-s1.binance.org:8545',
            accounts: ['4a08a15e44f04306fc9a9dff0ae08dfdaf6951c9c10d41ec2b6d682247d07606']
        }
    },
    etherscan: {
        apiKey: process.env.API_KEY
    }
};
