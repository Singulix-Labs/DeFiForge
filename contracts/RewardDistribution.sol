const [loading, setLoading] = useState(false); // New state to track loading state

const distributeRewards = async () => {
    if (!window.ethereum) return alert("No crypto wallet found");
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) return alert("Enter a valid amount");

    setLoading(true);
    setStatus("Transaction pending...");
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        const tx = await contract.distributeRewards({ value: ethers.utils.parseEther(amount) });
        await tx.wait();
        setStatus("Rewards distributed successfully!");
        fetchTotalStaked();
    } catch (err) {
        setStatus(`Transaction failed: ${err.message}`);
    }
    setLoading(false);
};
