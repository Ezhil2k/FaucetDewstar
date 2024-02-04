require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require('solidity-docgen');


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_INFURA_ENDPOINT,
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_KEY,
  },
  docgen: {}
};
