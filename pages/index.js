const handleTransaction = async (action) => {
    if (!window.ethereum) return alert("No crypto wallet found");
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) return alert("Enter a valid amount");

    setLoading(true);
    setStatus("Transaction pending...");
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        const value = ethers.utils.parseEther(amount);

        const tx = action === "stake" 
            ? await contract.stake({ value }) 
            : await contract.withdraw(value);

        provider.once(tx.hash, async (receipt) => { // Added real-time transaction confirmation tracking
            console.log("Transaction confirmed in block:", receipt.blockNumber);
            setStatus("Transaction confirmed!");
            getBalance(account);
        });

        await tx.wait(); // Wait for full transaction confirmation
        setStatus("Transaction successful!");
    } catch (err) {
        console.error("Transaction error:", err); // Log full error details

        if (err.code === "INSUFFICIENT_FUNDS") {
            setError("Transaction failed: Insufficient funds");
        } else if (err.code === "ACTION_REJECTED") { // Added user rejection handling
            setError("Transaction rejected by user.");
        } else if (err.code === "NETWORK_ERROR") {
            setError("Transaction failed: Network error. Please try again.");
        } else if (err.message.includes("gas")) { // Added gas-related error handling
            setError("Transaction failed: Insufficient gas limit.");
        } else {
            setError(`Transaction failed: ${err.message}`);
        }
        setStatus("");
    }
    setLoading(false);
};
