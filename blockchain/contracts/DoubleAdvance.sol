pragma solidity ^0.7.0;

import "./AbstractEscrow.sol";

// inspired by
// https://solidity.readthedocs.io/en/v0.7.1/solidity-by-example.html#safe-remote-purchase
// TODO: license?
// SPDX-License-Identifier: UNLICENSED
contract DoubleAdvance is AbstractEscrow {

    bool private buyerPaid = false;
    bool private sellerPaid = false;

    bool private buyerWithdrew = false;
    bool private sellerWithdrew = false;

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
            amountDeposited += msg.value;
            emit Transfer(msg.sender, msg.value);
        }

        if (msg.sender == seller) { // seller sent
            if (sellerPaid) { revert("Seller has already transferred funds for the item!"); }

            if (buyerPaid) {
                state = ContractState.LOCKED;
                emit Locked();
            }
            else {
                state = ContractState.AWAITING_OTHER;
            }

            sellerPaid = true;
            amountDeposited += msg.value;
            emit Transfer(msg.sender, msg.value);
        }
    }

    function withdrawMoney() override public
            onlyBuyerOrSeller inState(ContractState.RELEASED) {

        if(msg.sender == buyer) {
            if(buyerWithdrew) { revert("Buyer already withdrew money!"); }

            buyerWithdrew = true;
            emit Withdrawal(msg.sender, price);
            if(sellerWithdrew) {
                amountDeposited = 0;
                state = ContractState.COMPLETED;
                emit Completed();
            }

            amountDeposited -= price;
            buyer.transfer(price);
        }

        if(msg.sender == seller) {
            if(sellerWithdrew) { revert("Seller already withdrew money!"); }

            sellerWithdrew = true;
            emit Withdrawal(msg.sender, 3 * price);
            if(buyerWithdrew) {
                amountDeposited = 0;
                state = ContractState.COMPLETED;
                emit Completed();
            }

            amountDeposited -= 3 * price;
            seller.transfer(3 * price);
        }
    }

    // function meant to return the money deposited
    // before the other party commits to the agreement
    function backOut() public
        onlyBuyerOrSeller inState(ContractState.AWAITING_OTHER) {

        if(msg.sender == seller) {
            if(sellerPaid) {
                sellerPaid = false;
                amountDeposited = 0;
                state = ContractState.CREATED;
                emit Withdrawal(msg.sender, 2 * price);
                msg.sender.transfer(2 * price);
            }
            else { revert("Seller hasn't paid yet!"); }
        }

        if(msg.sender == buyer) {
            if(buyerPaid) {
                buyerPaid = false;
                amountDeposited = 0;
                state = ContractState.CREATED;
                emit Withdrawal(msg.sender, 2 * price);
                msg.sender.transfer(2 * price);
            }
        }
    }
}
