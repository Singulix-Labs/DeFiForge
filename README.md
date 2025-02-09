# DeFiForge - A Simple DeFi Staking DApp

DeFiForge is a decentralized finance (DeFi) staking application that allows users to stake and withdraw Ethereum securely on the blockchain. Built with modern web technologies and smart contracts, DeFiForge provides a seamless staking experience.

## Features
- **Stake ETH:** Users can stake ETH into the smart contract.
- **Withdraw ETH:** Users can withdraw their staked ETH at any time.
- **View Staked Balance:** Real-time updates of users' staked ETH balance.
- **Web3 Integration:** Connect with MetaMask or any Ethereum-compatible wallet.
- **Secure and Transparent:** Built using Solidity smart contracts deployed on the Ethereum blockchain.

## Tech Stack
- **Frontend:** Next.js, Tailwind CSS
- **Smart Contract:** Solidity, Hardhat
- **Blockchain Interaction:** ethers.js

## Installation

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MetaMask](https://metamask.io/)
- Hardhat (for local Ethereum blockchain development)

### Setup
1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/defiforge.git
   cd defiforge
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Start a local Ethereum node:**
   ```sh
   npx hardhat node
   ```

4. **Deploy the smart contract:**
   ```sh
   npx hardhat run scripts/deploy.js --network localhost
   ```

5. **Run the frontend application:**
   ```sh
   npm run dev
   ```

## Usage
1. Connect your wallet using MetaMask.
2. Enter the amount of ETH you want to stake.
3. Click the **Stake** button to deposit ETH.
4. View your staked balance.
5. Click the **Withdraw** button to withdraw your staked ETH.

## Smart Contract
The smart contract for DeFiForge is written in Solidity and manages staking and withdrawals securely. It includes:
- A mapping of user balances.
- Functions for staking and withdrawing ETH.
- Secure balance checks to prevent over-withdrawal.

## Hardhat Configuration
DeFiForge uses Hardhat for compiling, deploying, and testing smart contracts. The configuration supports both local development and Ethereum testnets.

## Roadmap
- ✅ Basic staking and withdrawal functionality
- ✅ Web3 integration with MetaMask
- 🚀 Future features: Rewards system, multi-token staking, and analytics dashboard

## Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch (`feature-xyz`).
3. Commit your changes.
4. Push the branch and open a Pull Request.

## License
This project is licensed under the MIT License.

---
**DeFiForge** - Secure, Transparent, and User-Friendly Staking. 🚀
