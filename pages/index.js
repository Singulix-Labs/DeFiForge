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

        const tx = action === "stake" ? contract.stake({ value }) : contract.withdraw(value);
        await tx.wait(); // Wait for transaction confirmation

        getBalance(account);
        setStatus("Transaction successful!");
    } catch (err) {
        if (err.code === "INSUFFICIENT_FUNDS") {
            setError("Transaction failed: Insufficient funds");
        } else if (err.code === "NETWORK_ERROR") {
            setError("Transaction failed: Network error. Please try again.");
        } else {
            setError(`Transaction failed: ${err.message}`);
        }
        setStatus("");
    }
    setLoading(false);
};
