// Import OpenZeppelin's ReentrancyGuard, SafeMath, and Address library
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Address.sol";

contract StakingContract is ReentrancyGuard {
    using SafeMath for uint256;
    using Address for address payable;

    mapping(address => uint256) public balances;
    address[] public stakers;
    uint256 public totalStaked;

    event Deposited(address indexed staker, uint256 amount); // Added event for deposits
    event Withdrawn(address indexed staker, uint256 amount);
    event StakerRemoved(address indexed staker);

    function deposit() external payable nonReentrant { // Added deposit function with reentrancy protection
        require(msg.value > 0, "Deposit must be greater than zero");

        if (balances[msg.sender] == 0) {
            stakers.push(msg.sender);
        }

        balances[msg.sender] = balances[msg.sender].add(msg.value);
        totalStaked = totalStaked.add(msg.value);

        emit Deposited(msg.sender, msg.value);
    }

    function withdraw(uint256 amount) external nonReentrant { // Added reentrancy guard
        require(balances[msg.sender] >= amount, "Insufficient balance");

        balances[msg.sender] = balances[msg.sender].sub(amount);
        totalStaked = totalStaked.sub(amount);

        if (balances[msg.sender] == 0) {
            removeStaker(msg.sender);
        }

        payable(msg.sender).sendValue(amount); // Uses Address library for safe ETH transfer
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
