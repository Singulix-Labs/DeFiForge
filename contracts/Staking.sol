// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Staking {
    mapping(address => uint256) public balances;
    uint256 public totalStaked;
    uint256 public minStakeAmount;
    address public owner;

    event Staked(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event MinStakeUpdated(uint256 newAmount);
    event RewardsDistributed(uint256 totalRewards);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    constructor(uint256 _initialMinStake) {
        owner = msg.sender;
        minStakeAmount = _initialMinStake;
    }

    function stake() external payable {
        require(msg.value >= minStakeAmount, "Must stake at least minimum amount");
        balances[msg.sender] += msg.value;
        totalStaked += msg.value;
        emit Staked(msg.sender, msg.value);
    }
    
    function withdraw(uint256 amount) external {
        require(balances[msg.sender] >= amount, "Insufficient balance");

        balances[msg.sender] -= amount;
        totalStaked -= amount;
        
        payable(msg.sender).transfer(amount);
        emit Withdrawn(msg.sender, amount);
    }

    function setMinStakeAmount(uint256 _amount) external onlyOwner {
        minStakeAmount = _amount;
        emit MinStakeUpdated(_amount);
    }

    function distributeRewards() external payable onlyOwner {
        require(msg.value > 0, "No rewards to distribute");
        require(totalStaked > 0, "No stakers available");

        for (address user in getAllStakers()) {
            uint256 reward = (msg.value * balances[user]) / totalStaked;
            payable(user).transfer(reward);
        }

        emit RewardsDistributed(msg.value);
    }

    function getAllStakers() internal view returns (address[] memory) {
        address[] memory stakers = new address[](totalStaked);
        uint256 index = 0;
        for (address user in balances) {
            if (balances[user] > 0) {
                stakers[index] = user;
                index++;
            }
        }
        return stakers;
    }
}
