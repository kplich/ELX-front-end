pragma solidity ^0.7.0;

// TODO: license?
// SPDX-License-Identifier: UNLICENSED
abstract contract AbstractEscrow {

    modifier inState(ContractState _state) {
        require(
            state == _state,
            "Invalid state."
        );
        _;
    }

    modifier onlyBuyer() {
        require(
            msg.sender == buyer,
            "Only buyer can call this"
        );
        _;
    }

    modifier onlySeller() {
        require(
            msg.sender == seller,
            "Only seller can call this."
        );
        _;
    }

    modifier onlyBuyerOrSeller() {
        require(
            msg.sender == seller || msg.sender == buyer,
            "Only buyer or seller can call this."
        );
        _;
    }

    enum ContractState {
        CREATED,
        AWAITING_OTHER,
        LOCKED,
        RELEASED,
        COMPLETED,
        REPORTED, // reserved for future use
        RESOLVED // reserved for future use
    }

    event Transfer(address from, uint amount);
    event Locked();
    event Released();
    event Withdrawal(address to, uint amount);
    event Completed();
    event Reported(); // reserved for future use
    event Resolved(address by); // reserved for future use

    address payable immutable public seller;
    address payable immutable public buyer;
    uint immutable public price;
    uint internal amountDeposited;
    ContractState internal state = ContractState.CREATED;

    receive() external payable {
        revert("Sending ether directly to the contract is not allowed. Use sendMoney() instead.");
    }

    function getBalance() public view returns(uint) {
        return amountDeposited;
    }

    constructor(address payable _seller, address payable _buyer, uint _price) {
        seller = _seller;
        buyer = _buyer;
        price = _price;
    }

    function release() public
            onlyBuyer inState(ContractState.LOCKED) {
        state = ContractState.RELEASED;
        emit Released();
    }

    function getState() public view returns(ContractState) {
        return state;
    }

    function sendMoney() public
        payable virtual;

    function withdrawMoney()
            public virtual;
}
