import { useState, useEffect } from "react";
import { ethers } from "ethers";

const contractAddress = "0xYourContractAddress";
const contractABI = [
    "function stake() external payable",
    "function withdraw(uint256 amount) external",
    "function balances(address) view returns (uint256)"
];

export default function Home() {
    const [amount, setAmount] = useState("");
    const [balance, setBalance] = useState(0);
    const [account, setAccount] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [status, setStatus] = useState("");  

    useEffect(() => {
        connectWallet();
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", connectWallet);
            window.ethereum.on("chainChanged", () => window.location.reload());
        }
    }, []);

    const connectWallet = async () => {
        if (!window.ethereum) return alert("No crypto wallet found");
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const accounts = await provider.send("eth_requestAccounts", []);
            setAccount(accounts[0]);
            getBalance(accounts[0]);
        } catch (err) {
            setError("Failed to connect wallet");
        }
    };

    const getBalance = async (userAddress) => {
        if (!window.ethereum) return;
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(contractAddress, contractABI, provider);
            const balance = await contract.balances(userAddress);
            setBalance(ethers.utils.formatEther(balance));
        } catch (err) {
            setError("Error fetching balance");
        }
    };

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
            setError(`Transaction failed: ${err.message}`);
            setStatus("");  
        }
        setLoading(false);
    };

    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold">DeFi Staking DApp</h1>
            {account ? <p>Connected: {account}</p> : <button onClick={connectWallet} className="bg-green-500 text-white p-2">Connect Wallet</button>}
            <p className="mb-4">Your Staked Balance: {balance} ETH</p>
            <input
                type="number"
                placeholder="Amount in ETH"
                className="border p-2"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <button className="bg-blue-500 text-white p-2 mx-2" onClick={() => handleTransaction("stake")} disabled={loading}>
                {loading ? "Staking..." : "Stake"}
            </button>
            <button className="bg-red-500 text-white p-2" onClick={() => handleTransaction("withdraw")} disabled={loading}>
                {loading ? "Withdrawing..." : "Withdraw"}
            </button>
            {status && <p className="text-green-500 mt-4">{status}</p>} 
            {error && <p className="text-red-500 mt-4">{error}</p>}  
        </div>
    );
}
