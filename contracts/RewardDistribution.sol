try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    const tx = await contract.distributeRewards({ value: ethers.utils.parseEther(amount) });
    await tx.wait();
    setStatus("Rewards distributed successfully!");
} catch (err) {
    if (err.code === "INSUFFICIENT_FUNDS") {
        setStatus("Transaction failed: Insufficient ETH balance");
    } else {
        setStatus(`Transaction failed: ${err.message}`);
    }
}
