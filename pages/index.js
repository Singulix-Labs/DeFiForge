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
    
    useEffect(() => {
        getBalance();
    }, []);

    const getBalance = async () => {
        if (!window.ethereum) return;
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, contractABI, provider);
        const signer = provider.getSigner();
        const userAddress = await signer.getAddress();
        const balance = await contract.balances(userAddress);
        setBalance(ethers.utils.formatEther(balance));
    };

    const handleStake = async () => {
        if (!window.ethereum) return alert("No crypto wallet found");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        await contract.stake({ value: ethers.utils.parseEther(amount) });
        getBalance();
    };

    const handleWithdraw = async () => {
        if (!window.ethereum) return alert("No crypto wallet found");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        await contract.withdraw(ethers.utils.parseEther(amount));
        getBalance();
    };

    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold">DeFi Staking DApp</h1>
            <p className="mb-4">Your Staked Balance: {balance} ETH</p>
            <input type="number" placeholder="Amount in ETH" className="border p-2" value={amount} onChange={e => setAmount(e.target.value)} />
            <button className="bg-blue-500 text-white p-2 mx-2" onClick={handleStake}>Stake</button>
            <button className="bg-red-500 text-white p-2" onClick={handleWithdraw}>Withdraw</button>
        </div>
    );
}
