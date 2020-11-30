const PlainAdvance = artifacts.require("../../../build/contracts/PlainAdvance");
const {expect, assert} = require("chai");
const BN = require('bn.js');
const truffleAssert = require('truffle-assertions');
const {toWei} = web3.utils;

const price = new BN(toWei("100000000", "ether"));
const advance = new BN(toWei("30000000", "ether"));

contract("PlainAdvance", accounts => {
    let seller = accounts[0];
    let buyer = accounts[1];

    it("should be created with correct price and advance", async () => {
        const contract = await PlainAdvance.new(seller, buyer, price, advance);

        expect(contract).to.be.ok;
        expect(await contract.seller(), "seller account different").to.equal(seller);
        expect(await contract.buyer(), "buyer account different").to.equal(buyer);
        assert((await contract.price()).eq(price), "price not as provided!");
        assert((await contract.advance()).eq(advance), "advance not as provided!");
        assert((await contract.getBalance()).isZero(), "initial balance not 0");
        // state CREATED is equivalent to 0
        assert((await contract.getState()).isZero(), "state not CREATED");
    });

    it("should not be created with advance greater than price", async () => {
        await truffleAssert.reverts(PlainAdvance.new(accounts[0], accounts[1], advance, price));
    });

    it("should not be able to receive Ethers through payable function", async () => {
        const contract = await PlainAdvance.new(seller, buyer, price, advance);
        await truffleAssert.reverts(contract.send(price));
    });
});

contract("PlainAdvance in state CREATED", accounts => {
    let seller = accounts[0];
    let buyer = accounts[1];
    let other = accounts[2];
    let instance;

    beforeEach(async () => {
        instance = await PlainAdvance.new(seller, buyer, price, advance);
    });

    it("should not accept Ethers from seller", async () => {
        await truffleAssert.reverts(instance.sendMoney({value: price, from: seller}));
    });

    it("should not accept Ethers from others", async () => {
        await truffleAssert.reverts(instance.sendMoney({value: price, from: other}));
    });

    it("should not accept values less than or more than price", async () => {
        await truffleAssert.reverts(instance.sendMoney({from: buyer}));
        await truffleAssert.reverts(instance.sendMoney({from: buyer, value: advance}));
        await truffleAssert.reverts(instance.sendMoney({from: buyer, value: advance.add(price)}));
    });

    it("should accept value only equal to price", async () => {
        await truffleAssert.passes(instance.sendMoney({from: buyer, value: price}));
    });

    contract("after receiving Ethers from the buyer", async () => {
        let tx;
        beforeEach(async () => {
            tx = await instance.sendMoney({from: buyer, value: price});
        });

        it("should be LOCKED after receiving Ethers from the buyer", async () => {
            // LOCKED state == 2
            // eqn - BN equals a Number
            assert((await instance.getState()).eqn(2), "contract not in LOCKED state");
        });

        it("should have emitted Transfer and Locked events after receiving Ethers from the buyer", async () => {
            await truffleAssert.eventEmitted(tx, "Locked");
            await truffleAssert.eventEmitted(tx, "Transfer", ev => {
                return ev.from === buyer && ev.amount.eq(price);
            });
        });

        it("should have balance equal to price minus advance after receiving Ethers from the buyer", async () => {
            assert((await instance.getBalance()).eq(price.sub(advance)), "balance not equal to price minus advance!");
        });
    });

    it("should not allow any other method than sendMoney() to be called", async () => {
        await truffleAssert.reverts(instance.release({from: buyer}));
        await truffleAssert.reverts(instance.release({from: seller}));
        await truffleAssert.reverts(instance.withdrawMoney({from: buyer}));
        await truffleAssert.reverts(instance.withdrawMoney({from: seller}));
    });
});

contract("PlainAdvance in state LOCKED", accounts => {
    let seller = accounts[0];
    let buyer = accounts[1];
    let other = accounts[2];
    let instance;

    beforeEach(async () => {
        instance = await PlainAdvance.new(seller, buyer, price, advance);
        await instance.sendMoney({value: price, from: buyer});
    });

    it("should not accept Ethers from anyone", async () => {
        await truffleAssert.reverts(instance.sendMoney({value: price, from: buyer}));
        await truffleAssert.reverts(instance.sendMoney({value: price, from: seller}));
        await truffleAssert.reverts(instance.sendMoney({value: price, from: other}));
    });

    it("should not allow anyone to withdraw Ethers", async () => {
        await truffleAssert.reverts(instance.withdrawMoney({from: buyer}));
        await truffleAssert.reverts(instance.withdrawMoney({from: seller}));
        await truffleAssert.reverts(instance.withdrawMoney({from: other}));
    });

    it("should not allow others to release the Ethers", async () => {
        await truffleAssert.reverts(instance.release({from: other}));
    });

    it("should not allow the seller to release the Ethers", async () => {
        await truffleAssert.reverts(instance.release({from: seller}));
    });

    it("should allow the buyer to release the Ethers", async () => {
        await truffleAssert.passes(instance.release({from: buyer}));
    });

    contract("after releasing Ethers", () => {
        let tx;
        beforeEach(async () => {
            tx = await instance.release({from: buyer});
        });

        it("should be in RELEASED state", async () => {
            // RELEASED state == 3
            // eqn - BN equals a Number
            assert((await instance.getState()).eqn(3), "contract not in RELEASED state");
        });

        it("should have emitted a Released event", async () => {
            await truffleAssert.eventEmitted(tx, "Released");
        });

        it("should have balance equal to price minus advance", async () => {
            assert((await instance.getBalance()).eq(price.sub(advance)), "balance not equal to price minus advance!");
        });
    });
});

contract("PlainAdvance in state RELEASED", accounts => {
    let seller = accounts[0];
    let buyer = accounts[1];
    let other = accounts[2];
    let instance;

    beforeEach(async () => {
        instance = await PlainAdvance.new(seller, buyer, price, advance);
        await instance.sendMoney({value: price, from: buyer});
        await instance.release({from: buyer});
    });

    it("should not allow any other method than withdrawMoney() to be called", async () => {
        await truffleAssert.reverts(instance.release({from: buyer}));
        await truffleAssert.reverts(instance.release({from: seller}));
        await truffleAssert.reverts(instance.release({from: other}));
        await truffleAssert.reverts(instance.sendMoney({value: price, from: buyer}));
        await truffleAssert.reverts(instance.sendMoney({value: price, from: seller}));
        await truffleAssert.reverts(instance.sendMoney({value: price, from: other}))
    });

    it("should not allow the buyer to withdraw Ethers", async () => {
        await truffleAssert.reverts(instance.withdrawMoney({from: buyer}));
    });

    it("should not allow others to withdraw Ethers", async () => {
        await truffleAssert.reverts(instance.withdrawMoney({from: other}));
    });

    it("should allow the seller to withdraw Ethers", async () => {
        await truffleAssert.passes(instance.withdrawMoney({from: seller}));
    });

    contract("after withdrawing Ethers by the seller", async () => {
        let tx;
        beforeEach(async () => {
            tx = await instance.withdrawMoney({from: seller});
        });

        it("should emit Completed and Withdrawal events", async () => {
            // assert that events were emitted
            await truffleAssert.eventEmitted(tx, "Completed");
            await truffleAssert.eventEmitted(tx, "Withdrawal", ev => {
                return ev.to === seller && ev.amount.eq(price.sub(advance));
            });
        });

        it("should be in COMPLETED state", async () => {
            // COMPLETED state == 4
            // eqn - BN equals a Number
            assert((await instance.getState()).eqn(4), "contract not in COMPLETED state");
        });

        it("should have balance equal to zero", async () => {
            assert((await instance.getBalance()).isZero(), "balance not zero!");
        });

    });
});

contract("PlainAdvance in state COMPLETED", accounts => {
    let seller = accounts[0];
    let buyer = accounts[1];
    let other = accounts[2];
    let instance;

    beforeEach(async () => {
        instance = await PlainAdvance.new(seller, buyer, price, advance);
        await instance.sendMoney({value: price, from: buyer});
        await instance.release({from: buyer});
        await instance.withdrawMoney({from: seller});
    });

    it("should not allow any methods to be executed", async () => {
        await truffleAssert.reverts(instance.sendMoney({value: price, from: buyer}));
        await truffleAssert.reverts(instance.sendMoney({value: price, from: seller}));
        await truffleAssert.reverts(instance.sendMoney({value: price, from: other}));
        await truffleAssert.reverts(instance.release({from: buyer}));
        await truffleAssert.reverts(instance.release({from: seller}));
        await truffleAssert.reverts(instance.release({from: other}));
        await truffleAssert.reverts(instance.withdrawMoney({from: buyer}));
        await truffleAssert.reverts(instance.withdrawMoney({from: seller}));
        await truffleAssert.reverts(instance.withdrawMoney({from: other}));
    });
});
