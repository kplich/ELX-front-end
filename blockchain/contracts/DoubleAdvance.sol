pragma solidity ^0.7.0;

import "./AbstractEscrow.sol";

// TODO: license?
// SPDX-License-Identifier: UNLICENSED
contract DoubleAdvance is AbstractEscrow {
    constructor(address payable _seller, address payable _buyer, uint _price)
            AbstractEscrow(_seller, _buyer, _price) {}

    function sendMoney() override public
    payable onlyBuyer inState(ContractState.CREATED) {
        require(msg.value == price, "Amount sent must be equal to price.");

        state = ContractState.LOCKED;
        emit Locked();

        emit Transfer(Party.BUYER, msg.value);
    }

    function withdrawMoney() override public
    onlySeller inState(ContractState.RELEASED) {
        emit Withdrawal(Party.SELLER, getBalance());
        seller.transfer(getBalance());

        assert(getBalance() == 0);
    }
}
