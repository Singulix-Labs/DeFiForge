import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

const contractAddress = "0xYourContractAddress";
const contractABI = [
    "function distributeRewards() external payable",
    "function totalStaked() view returns (uint256)"
];

export default function Rewards() {
    const [amount, setAmount] = useState("");
    const [status, setStatus] = useState("");
    const [totalStaked, setTotalStaked] = useState("0"); // New state to store total staked amount

    useEffect(() => {
        fetchTotalStaked();
    }, []);

    const fetchTotalStaked = async () => {
        if (!window.ethereum) return;
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(contractAddress, contractABI, provider);
            const staked = await contract.totalStaked();
            setTotalStaked(ethers.utils.formatEther(staked));
        } catch (err) {
            setStatus("Error fetching total staked amount.");
        }
    };

    const distributeRewards = async () => {
        if (!window.ethereum) return alert("No crypto wallet found");
        if (!amount || isNaN(amount) || parseFloat(amount) <= 0) return alert("Enter a valid amount");

        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, signer);

            const tx = await contract.distributeRewards({ value: ethers.utils.parseEther(amount) });
            await tx.wait();
            setStatus("Rewards distributed successfully!");
            fetchTotalStaked(); // Refresh total staked amount after transaction
        } catch (err) {
            setStatus(`Transaction failed: ${err.message}`);
        }
    };

    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold">Rewards Distribution</h1>
            <p>Total Staked: {totalStaked} ETH</p> {/* Display total staked amount */}
            <input
                type="number"
                placeholder="Amount in ETH"
                className="border p-2"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <button className="bg-green-500 text-white p-2 mx-2" onClick={distributeRewards}>
                Distribute Rewards
            </button>
            {status && <p className="text-green-500 mt-4">{status}</p>}
        </div>
    );
}
