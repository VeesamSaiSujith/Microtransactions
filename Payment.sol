// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Payment {
    event PaymentSent(address indexed sender, address indexed recipient, uint256 amount, bytes32 txHash);

    function sendPayment(address payable recipient) external payable {
        require(msg.value > 0, "Amount must be greater than zero");
        require(recipient != address(0), "Invalid recipient address");

        recipient.transfer(msg.value);

        emit PaymentSent(msg.sender, recipient, msg.value, blockhash(block.number - 1));
    }
}
