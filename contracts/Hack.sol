pragma solidity ^0.4.21;

import "./FuzzyIdentityChallenge.sol";
import "hardhat/console.sol";

contract Hack {
    function name() external view returns (bytes32) {
        return bytes32("smarx");
    }

    function hackIt(address challengeAddr) external {
        FuzzyIdentityChallenge(challengeAddr).authenticate();
        // make sure we solved the puzzle:
        require(FuzzyIdentityChallenge(challengeAddr).isComplete());
    }
}
