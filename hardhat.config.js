require("@nomicfoundation/hardhat-toolbox");

module.exports = {
    solidity: "0.8.0",
    networks: {
        hardhat: {
            gas: "auto" // Added to simulate automatic gas optimization
        },
        localhost: {
            url: "http://127.0.0.1:8545"
        }
    }
};
