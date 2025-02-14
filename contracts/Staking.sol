pragma solidity ^0.8.0;

contract Staking {
    mapping(address => uint256) public balances; 
    uint256 public totalStaked; // Added total staked tracking
    uint256 public minStakeAmount = 0.01 ether; // Added minimum stake amount

    event Staked(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);

    function stake() external payable {
        require(msg.value >= minStakeAmount, "Must stake at least minimum amount");
        balances[msg.sender] += msg.value;
        totalStaked += msg.value; // Update total staked amount
        emit Staked(msg.sender, msg.value);
    }
    
    function withdraw(uint256 amount) external {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        totalStaked -= amount; // Update total staked amount
        payable(msg.sender).transfer(amount);
        emit Withdrawn(msg.sender, amount);
    }

    function setMinStakeAmount(uint256 _amount) external {
        minStakeAmount = _amount; // Allow updating the minimum stake amount
    }
}
