pragma solidity ^0.7.0;

import "./AbstractEscrow.sol";

// inspired by
// https://solidity.readthedocs.io/en/v0.7.1/solidity-by-example.html#safe-remote-purchase
// TODO: license?
// SPDX-License-Identifier: UNLICENSED
contract DoubleAdvance is AbstractEscrow {

    bool public buyerPaid = false;
    bool public sellerPaid = false;

    bool public buyerWithdrew = false;
    bool public sellerWithdrew = false;

    constructor(address payable _seller, address payable _buyer, uint _price)
            AbstractEscrow(_seller, _buyer, _price) {}

    function sendMoney() override public
            payable
            onlyBuyerOrSeller {
        require(
            state == ContractState.CREATED || state == ContractState.AWAITING_OTHER,
            "Contract is in invalid state."
        );
        require(msg.value == 2 * price, "Amount sent must be equal to double the price.");

        if(msg.sender == buyer) { // buyer sent
            if (buyerPaid) { revert("Buyer has already transferred funds for the item!"); }

            if (sellerPaid) {
                state = ContractState.LOCKED;
                emit Locked();
            }
            else {
                state = ContractState.AWAITING_OTHER;
            }

            buyerPaid = true;
            emit Transfer(Party.BUYER, msg.value);
        }
        else if (msg.sender == seller) { // seller sent
            if (sellerPaid) { revert("Seller has already transferred funds for the item!"); }

            if (buyerPaid) {
                state = ContractState.LOCKED;
                emit Locked();
            }
            else {
                state = ContractState.AWAITING_OTHER;
            }

            sellerPaid = true;
            emit Transfer(Party.SELLER, msg.value);
        }
        else { revert("Error - unauthorized caller"); }
    }

    function withdrawMoney() override public
            onlyBuyerOrSeller inState(ContractState.RELEASED) {
        if(msg.sender == buyer) {
            if(buyerWithdrew) { revert("Buyer already withdrew money!"); }

            buyerWithdrew = true;
            emit Withdrawal(Party.BUYER, price);
            if(sellerWithdrew) {
                state = ContractState.COMPLETED;
                emit Completed();
            }

            buyer.transfer(price);
        }
        else if(msg.sender == seller) {
            if(sellerWithdrew) { revert("Seller already withdrew money!"); }

            sellerWithdrew = true;
            emit Withdrawal(Party.SELLER, 3 * price);
            if(buyerWithdrew) {
                state = ContractState.COMPLETED;
                emit Completed();
            }

            seller.transfer(3 * price);
        }
        else { revert("Error - unauthorized caller"); }
    }
}
