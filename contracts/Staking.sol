// Import OpenZeppelin's ReentrancyGuard and SafeMath
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract StakingContract is ReentrancyGuard {
    using SafeMath for uint256;

    mapping(address => uint256) public balances;
    address[] public stakers;
    uint256 public totalStaked;

    event Withdrawn(address indexed staker, uint256 amount);
    event StakerRemoved(address indexed staker);

    function withdraw(uint256 amount) external nonReentrant { // Added reentrancy guard
        require(balances[msg.sender] >= amount, "Insufficient balance");

        balances[msg.sender] = balances[msg.sender].sub(amount);
        totalStaked = totalStaked.sub(amount);

        if (balances[msg.sender] == 0) {
            removeStaker(msg.sender);
        }

        payable(msg.sender).transfer(amount);
        emit Withdrawn(msg.sender, amount);
    }

    function removeStaker(address staker) internal {
        for (uint256 i = 0; i < stakers.length; i++) {
            if (stakers[i] == staker) {
                stakers[i] = stakers[stakers.length - 1];
                stakers.pop();
                emit StakerRemoved(staker); // Emit event when a staker is removed
                break;
            }
        }
    }
}
