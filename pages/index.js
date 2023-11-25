const [transactions, setTransactions] = useState([]); // New state for transaction history

const listenToEvents = async () => {
    if (!window.ethereum) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, contractABI, provider);

    contract.on("Staked", (user, amount) => {
        setTransactions((prev) => [...prev, { action: "Staked", user, amount: ethers.utils.formatEther(amount) }]);
    });

    contract.on("Withdrawn", (user, amount) => {
        setTransactions((prev) => [...prev, { action: "Withdrawn", user, amount: ethers.utils.formatEther(amount) }]);
    });
};
