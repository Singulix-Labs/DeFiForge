try {
    setStatus("Processing transaction...");
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    const tx = await contract.distributeRewards({ value: ethers.utils.parseEther(amount) });

    // Listen for transaction confirmation
    provider.once(tx.hash, (receipt) => {
        console.log("Transaction confirmed in block:", receipt.blockNumber);
        setStatus("Rewards distributed successfully!");
    });

    await tx.wait();
} catch (err) {
    console.error("Transaction error:", err); // Logs full error details
    setStatus(`Transaction failed: ${err.message}`);
} finally {
    setLoading(false); // Ensure loading state is cleared after the process
}
