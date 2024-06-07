function distributeRewards() external payable onlyOwner {
    require(msg.value > 0, "No rewards to distribute");
    require(totalStaked > 0, "No stakers available");

    for (uint256 i = 0; i < stakers.length; i++) {
        address user = stakers[i];
        uint256 reward = (msg.value * balances[user]) / totalStaked;
        payable(user).transfer(reward);
    }

    emit RewardsDistributed(msg.value);
}
