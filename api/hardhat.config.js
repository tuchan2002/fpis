// eslint-disable-next-line import/no-extraneous-dependencies
require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: '0.8.19',
    networks: {
        bscTestnet: {
            url: 'https://data-seed-prebsc-1-s1.binance.org:8545',
            accounts: ['571P86E2GPFENQPKRXDC3CT2SPRV65SF5J']
        }
    },
    etherscan: {
        apiKey: process.env.API_KEY
    }
};
