// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Staking {
    mapping(address => uint256) public balances;
    address[] private stakers; // Added stakers array
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

        if (balances[msg.sender] == 0) {
            stakers.push(msg.sender); // Track new stakers
        }

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

    function getAllStakers() public view returns (address[] memory) {
        return stakers; // Return tracked stakers
    }
}
