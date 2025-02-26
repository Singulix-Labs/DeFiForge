require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // Load environment variables

const getAccounts = () => (process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []);

module.exports = {
    solidity: "0.8.0",
    networks: {
        hardhat: {
            gas: "auto"
        },
        localhost: {
            url: "http://127.0.0.1:8545"
        },
        goerli: {
            url: process.env.GOERLI_RPC_URL || "https://eth-goerli.alchemyapi.io/v2/YOUR_API_KEY",
            accounts: getAccounts()
        },
        sepolia: {
            url: process.env.SEPOLIA_RPC_URL || "https://eth-sepolia.alchemyapi.io/v2/YOUR_API_KEY",
            accounts: getAccounts()
        },
        mumbai: {
            url: process.env.MUMBAI_RPC_URL || "https://polygon-mumbai.infura.io/v3/YOUR_API_KEY",
            accounts: getAccounts()
        },
        optimism: {
            url: process.env.OPTIMISM_RPC_URL || "https://optimism-goerli.infura.io/v3/YOUR_API_KEY",
            accounts: getAccounts()
        },
        bscTestnet: {
            url: process.env.BSC_TESTNET_RPC_URL || "https://data-seed-prebsc-1-s1.binance.org:8545",
            accounts: getAccounts()
        },
        arbitrumGoerli: {
            url: process.env.ARBITRUM_GOERLI_RPC_URL || "https://arb-goerli.g.alchemy.com/v2/YOUR_API_KEY",
            accounts: getAccounts()
        },
        avalancheFuji: { // Added Avalanche Fuji testnet
            url: process.env.AVALANCHE_FUJI_RPC_URL || "https://api.avax-test.network/ext/bc/C/rpc",
            accounts: getAccounts()
        }
    }
};
