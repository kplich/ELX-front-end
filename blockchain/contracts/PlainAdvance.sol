pragma solidity ^0.6.0;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "./AbstractEscrow.sol";

// TODO: license?
// SPDX-License-Identifier: UNLICENSED
contract PlainAdvance is AbstractEscrow {

    using SafeMath for uint256;

    uint public immutable advance;

    constructor(address payable _seller, address payable _buyer, uint _price, uint _advance) public
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

        amountDeposited = amountDeposited.add(msg.value.sub(advance));
        seller.transfer(advance);
    }

    function withdrawMoney() override public
            onlySeller inState(ContractState.RELEASED) {
        emit Withdrawal(msg.sender, price.sub(advance));
        emit Completed();

        state = ContractState.COMPLETED;

        amountDeposited = amountDeposited.sub(price.sub(advance));
        seller.transfer(price.sub(advance));
    }
}
