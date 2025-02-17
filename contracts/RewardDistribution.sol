import React, { useState } from "react";
import { ethers } from "ethers";

const contractAddress = "0xYourContractAddress";
const contractABI = [
    "function distributeRewards() external payable",
    "function totalStaked() view returns (uint256)"
];

export default function Rewards() {
    const [amount, setAmount] = useState("");
    const [status, setStatus] = useState("");
    
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
        } catch (err) {
            setStatus(`Transaction failed: ${err.message}`);
        }
    };
    
    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold">Rewards Distribution</h1>
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
