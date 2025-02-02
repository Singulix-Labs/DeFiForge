function withdraw(uint256 amount) external {
    require(balances[msg.sender] >= amount, "Insufficient balance");

    balances[msg.sender] -= amount;
    totalStaked -= amount;

    if (balances[msg.sender] == 0) {
        removeStaker(msg.sender); // Remove empty stakers
    }

    payable(msg.sender).transfer(amount);
    emit Withdrawn(msg.sender, amount);
}

function removeStaker(address staker) internal {
    for (uint256 i = 0; i < stakers.length; i++) {
        if (stakers[i] == staker) {
            stakers[i] = stakers[stakers.length - 1]; // Move last staker to this position
            stakers.pop(); // Remove last element
            break;
        }
    }
}
