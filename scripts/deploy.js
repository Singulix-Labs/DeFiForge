const hre = require("hardhat");

async function main() {
    const Staking = await hre.ethers.getContractFactory("Staking");
    const staking = await Staking.deploy();
    await staking.deployed();
    console.log("Staking deployed to:", staking.address);

    // Verify contract on Etherscan if API key is available
    if (process.env.ETHERSCAN_API_KEY) {
        console.log("Waiting for block confirmations...");
        await staking.deployTransaction.wait(5);
        await hre.run("verify:verify", {
            address: staking.address,
            constructorArguments: [],
        });
        console.log("Contract verified on Etherscan!");
    }
}

main().catch(error => {
    console.error(error);
    process.exit(1);
});
