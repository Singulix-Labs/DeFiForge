require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // Added dotenv for environment variables

module.exports = {
    solidity: "0.8.0",
    networks: {
        hardhat: {
            gas: "auto" // Simulate automatic gas optimization
        },
        localhost: {
            url: "http://127.0.0.1:8545"
        },
        goerli: { // Added Goerli test network configuration
            url: process.env.GOERLI_RPC_URL, 
            accounts: [process.env.PRIVATE_KEY]
        },
        sepolia: { // Added Sepolia test network configuration
            url: process.env.SEPOLIA_RPC_URL,
            accounts: [process.env.PRIVATE_KEY]
        }
    }
};
