// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Donation {
    address public owner;
    uint256 public totalDonations;

    constructor() {
        owner = msg.sender;
    }

    function donate() public payable {
        require(msg.value > 0, "Donation amount must be greater than 0");
        totalDonations += msg.value;
    }

    function withdraw() public {
        require(msg.sender == owner, "Only owner can withdraw");
        payable(owner).transfer(address(this).balance);
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}