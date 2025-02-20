const hre = require("hardhat");

async function main() {
    const Staking = await hre.ethers.getContractFactory("Staking");
    console.log("Deploying Staking contract...");

    const constructorArgs = process.env.CONSTRUCTOR_ARGS ? JSON.parse(process.env.CONSTRUCTOR_ARGS) : [];
    const staking = await Staking.deploy(...constructorArgs, { gasLimit: 5000000 });

    await staking.deployed();
    console.log(`Staking contract deployed successfully to address: ${staking.address}`);

    // Ensure the contract is initialized properly
    if (process.env.INIT_PARAMS) {
        try {
            console.log("Initializing Staking contract...");
            const initParams = JSON.parse(process.env.INIT_PARAMS);
            const initTx = await staking.initialize(...initParams);
            await initTx.wait();
            console.log("Staking contract initialized successfully!");
        } catch (error) {
            console.error("Error during initialization:", error);
        }
    }

    // Verify contract on Etherscan if API key is provided
    if (process.env.ETHERSCAN_API_KEY) {
        console.log("Waiting for 5 block confirmations before verifying on Etherscan...");
        await staking.deployTransaction.wait(5);
        try {
            await hre.run("verify:verify", {
                address: staking.address,
                constructorArguments: constructorArgs,
            });
            console.log("Contract verified on Etherscan!");
        } catch (verificationError) {
            console.error("Verification failed:", verificationError);
        }
    } else {
        console.log("Skipping Etherscan verification as no API key was provided.");
    }
}

// Handle deployment errors
main().catch(error => {
    console.error("Error encountered during deployment:", error);
    process.exit(1);
});
