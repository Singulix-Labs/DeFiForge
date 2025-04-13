const hre = require("hardhat");

async function main() {
    const Staking = await hre.ethers.getContractFactory("Staking");
    console.log("Deploying Staking contract...");

    const constructorArgs = process.env.CONSTRUCTOR_ARGS ? JSON.parse(process.env.CONSTRUCTOR_ARGS) : [];
    const staking = await Staking.deploy(...constructorArgs, { gasLimit: 5000000 });

    await staking.deployed();
    console.log(`Staking contract deployed successfully to address: ${staking.address}`);

    // Listen for deployment confirmation
    staking.once("Deployed", () => {
        console.log("Deployment event received: Staking contract is live!");
    });

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
            // Retry initialization in case of failure (new addition)
            console.log("Retrying contract initialization...");
            try {
                const initTxRetry = await staking.initialize(...JSON.parse(process.env.INIT_PARAMS));
                await initTxRetry.wait();
                console.log("Staking contract initialized successfully after retry.");
            } catch (retryError) {
                console.error("Retry failed:", retryError);
            }
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
            // Log verification failure and proceed to next steps
            console.log("Proceeding without verification due to failure.");
        }
    } else {
        console.log("Skipping Etherscan verification as no API key was provided.");
    }
}

// Handle deployment errors and retry logic if needed
async function deployWithRetry(retries = 3) {
    let attempts = 0;
    while (attempts < retries) {
        try {
            await main();
            break; // Exit loop if deployment succeeds
        } catch (error) {
            attempts++;
            console.error(`Deployment attempt ${attempts} failed. Retrying...`);
            if (attempts === retries) {
                console.error("Max retries reached. Deployment failed.");
                process.exit(1);
            }
        }
    }
}

deployWithRetry().catch(error => {
    console.error("Error encountered during deployment:", error);
    process.exit(1);
});
