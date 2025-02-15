// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Staking {
    mapping(address => uint256) public balances;
    uint256 public totalStaked;
    uint256 public minStakeAmount;
    address public owner; // Added owner variable

    event Staked(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event MinStakeUpdated(uint256 newAmount); // Added event for min stake updates

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
        
        // Checks-effects-interactions pattern for security
        balances[msg.sender] -= amount;
        totalStaked -= amount;
        
        payable(msg.sender).transfer(amount);
        emit Withdrawn(msg.sender, amount);
    }

    function setMinStakeAmount(uint256 _amount) external onlyOwner {
        minStakeAmount = _amount;
        emit MinStakeUpdated(_amount);
    }
}
