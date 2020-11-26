pragma solidity ^0.7.0;

import "./AbstractEscrow.sol";

// TODO: license?
// SPDX-License-Identifier: UNLICENSED
contract PlainAdvance is AbstractEscrow {

    uint public immutable advance;

    constructor(address payable _seller, address payable _buyer, uint _price, uint _advance)
        AbstractEscrow(_seller, _buyer, _price) {
        require(_price >= _advance, "Price greater than/equal advance");
        advance = _advance;
    }

    function sendMoney() override public
            payable onlyBuyer inState(ContractState.CREATED) {
        require(msg.value == price, "Amount sent must be equal to price.");

        state = ContractState.LOCKED;
        emit Locked();
        emit Transfer(msg.sender, msg.value);

        amountDeposited += msg.value - advance;
        seller.transfer(advance);
    }

    function withdrawMoney() override public
            onlySeller inState(ContractState.RELEASED) {
        emit Withdrawal(msg.sender, price - advance);
        emit Completed();

        state = ContractState.COMPLETED;

        amountDeposited -= (price - advance);
        seller.transfer(price - advance);
    }
}
