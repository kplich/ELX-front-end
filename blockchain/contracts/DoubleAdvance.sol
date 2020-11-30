pragma solidity ^0.6.0;

import "./AbstractEscrow.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

// inspired by
// https://solidity.readthedocs.io/en/v0.7.1/solidity-by-example.html#safe-remote-purchase
// TODO: license?
// SPDX-License-Identifier: UNLICENSED
contract DoubleAdvance is AbstractEscrow {

    using SafeMath for uint256;

    bool private buyerPaid = false;
    bool private sellerPaid = false;

    bool private buyerWithdrew = false;
    bool private sellerWithdrew = false;

    constructor(address payable _seller, address payable _buyer, uint _price) public
            AbstractEscrow(_seller, _buyer, _price) {}

    function sendMoney() override public
            payable
            onlyBuyerOrSeller {
        require(
            state == ContractState.CREATED || state == ContractState.AWAITING_OTHER,
            "Contract is in invalid state."
        );
        require(msg.value == price.mul(2), "Amount sent must be equal to double the price.");

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
        }

        amountDeposited = amountDeposited.add(msg.value);
        emit Transfer(msg.sender, msg.value);
    }

    function withdrawMoney() override public
            onlyBuyerOrSeller inState(ContractState.RELEASED) {

        if(msg.sender == buyer) {
            if(buyerWithdrew) { revert("Buyer already withdrew money!"); }

            buyerWithdrew = true;
            emit Withdrawal(msg.sender, price);
            if(sellerWithdrew) {
                state = ContractState.COMPLETED;
                emit Completed();
            }

            amountDeposited = amountDeposited.sub(price);
            buyer.transfer(price);
        }

        if(msg.sender == seller) {
            if(sellerWithdrew) { revert("Seller already withdrew money!"); }

            sellerWithdrew = true;
            emit Withdrawal(msg.sender, price.mul(3));
            if(buyerWithdrew) {
                state = ContractState.COMPLETED;
                emit Completed();
            }

            amountDeposited = amountDeposited.sub(price.mul(3));
            seller.transfer(price.mul(3));
        }
    }
}
