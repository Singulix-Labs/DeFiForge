const hre = require("hardhat");

async function main() {
    const Staking = await hre.ethers.getContractFactory("Staking");
    console.log("Deploying Staking contract...");
    const staking = await Staking.deploy();

    await staking.deployed();
    console.log(`Staking contract deployed successfully to address: ${staking.address}`);

    // Simulate a function call to initialize the contract if needed
    console.log("Initializing Staking contract...");
    const initTx = await staking.initialize();
    await initTx.wait();
    console.log("Staking contract initialized successfully!");

    // Verify contract on Etherscan if API key is available
    if (process.env.ETHERSCAN_API_KEY) {
        console.log("Waiting for 5 block confirmations before verifying on Etherscan...");
        await staking.deployTransaction.wait(5);
        try {
            await hre.run("verify:verify", {
                address: staking.address,
                constructorArguments: [],
            });
            console.log("Contract verified on Etherscan!");
        } catch (verificationError) {
            console.error("Verification failed. Possible reasons: incorrect constructor arguments or block delay.");
        }
    } else {
        console.log("Skipping Etherscan verification as no API key was provided.");
    }
}

main().catch(error => {
    console.error("Error encountered during deployment:", error);
    process.exit(1);
});
