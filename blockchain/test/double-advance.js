const DoubleAdvance = artifacts.require("../../../build/contracts/DoubleAdvance");
const {expect, assert} = require("chai");
const BN = require("bn.js");
const truffleAssert = require("truffle-assertions");
const {toWei} = web3.utils;

const price = new BN(toWei("100000000", "ether"));
const twice = price.muln(2);
const thrice = price.muln(3);
const fourTimes = price.muln(4);

contract("DoubleAdvance", accounts => {
    let seller = accounts[0];
    let buyer = accounts[1];

    it("should be created with correct price", async () => {
        const contract = await DoubleAdvance.new(seller, buyer, price);

        expect(contract).to.be.ok;
        expect(await contract.seller(), "seller account different").to.equal(seller);
        expect(await contract.buyer(), "buyer account different").to.equal(buyer);
        assert((await contract.price()).eq(price), "price not as provided!");
        assert((await contract.getBalance()).isZero(), "initial balance not 0");
        // state CREATED is equivalent to 0
        assert((await contract.getState()).isZero(), "state not CREATED");
    });

    it("should not be able to receive Ethers through payable function", async () => {
        const price = new BN(toWei("100000000", "ether"));
        const contract = await DoubleAdvance.new(seller, buyer, price);
        await truffleAssert.reverts(contract.send(price));
    });
});

contract("DoubleAdvance in state CREATED", accounts => {
    let seller = accounts[0];
    let buyer = accounts[1];
    let other = accounts[2];
    let instance;

    beforeEach(async () => {
        instance = await DoubleAdvance.new(seller, buyer, price);
    });

    it("should not be able to receive Ethers through payable function", async () => {
        await truffleAssert.reverts(instance.send(price));
    });

    it("should not accept less or more than twice the value", async () => {
        await truffleAssert.reverts(instance.sendMoney({value: price, from: seller}));
        await truffleAssert.reverts(instance.sendMoney({value: thrice, from: seller}));
        await truffleAssert.reverts(instance.sendMoney({value: price, from: buyer}));
        await truffleAssert.reverts(instance.sendMoney({value: thrice, from: seller}));
    });

    it("should accept twice the value from seller", async () => {
        await truffleAssert.passes(instance.sendMoney({value: twice, from: seller}));
    });

    it("should accept twice the value from buyer", async () => {
        await truffleAssert.passes(instance.sendMoney({value: twice, from: buyer}));
    });

    it("should not accept Ethers from others", async () => {
        await truffleAssert.reverts(instance.sendMoney({value: twice, from: other}));
    });

    contract("after receiving Ethers from the seller", async () => {
        let tx;
        beforeEach(async () => {
            tx = await instance.sendMoney({value: twice, from: seller});
        });

        it("should be AWAITING OTHER", async () => {
            // AWAITING_OTHER state == 1
            // eqn - BN equals a Number
            assert((await instance.getState()).eqn(1), "contract not in AWAITING_OTHER state");
        });

        it("should emit a Transfer event", async () => {
            await truffleAssert.eventEmitted(tx, "Transfer", ev => {
                return ev.from === seller && ev.amount.eq(twice);
            });
        });

        it("should not emit a Locked event", async () => {
            await truffleAssert.eventNotEmitted(tx, "Locked");
        });

        it("should have balance equal to twice the value", async () => {
            assert((await instance.getBalance()).eq(twice), "balance not equal to twice the price!");
        });
    });

    contract("after receiving Ethers from the buyer", async () => {
        let tx;
        beforeEach(async () => {
            tx = await instance.sendMoney({value: twice, from: buyer});
        });

        it("should be AWAITING OTHER", async () => {
            // AWAITING_OTHER state == 1
            // eqn - BN equals a Number
            assert((await instance.getState()).eqn(1), "contract not in AWAITING_OTHER state");
        });

        it("should emit a Transfer event", async () => {
            await truffleAssert.eventEmitted(tx, "Transfer", ev => {
                return ev.from === buyer && ev.amount.eq(twice);
            });
        });

        it("should not emit a Locked event", async () => {
            await truffleAssert.eventNotEmitted(tx, "Locked");
        });

        it("should have balance equal to twice the value", async () => {
            assert((await instance.getBalance()).eq(twice), "balance not equal to twice the price!");
        });
    });

    it("should not allow any other method than sendMoney() to be called", async () => {
        await truffleAssert.reverts(instance.release({from: buyer}));
        await truffleAssert.reverts(instance.release({from: seller}));
        await truffleAssert.reverts(instance.release({from: other}));
        await truffleAssert.reverts(instance.withdrawMoney({from: buyer}));
        await truffleAssert.reverts(instance.withdrawMoney({from: seller}));
        await truffleAssert.reverts(instance.withdrawMoney({from: other}));
    });
});

contract("DoubleAdvance in state AWAITING_OTHER (after receiving Ethers from seller)", accounts => {
    let seller = accounts[0];
    let buyer = accounts[1];
    let other = accounts[2];
    let instance;

    beforeEach(async () => {
        instance = await DoubleAdvance.new(seller, buyer, price);
        await instance.sendMoney({value: twice, from: seller});
    });

    it("should not allow the seller to send Ethers again", async () => {
        await truffleAssert.reverts(instance.sendMoney({value: twice, from: seller}));
    });

    it("should not allow others to send Ethers", async () => {
        await truffleAssert.reverts(instance.sendMoney({value: twice, from: other}));
    });

    it("should allow the buyer to send Ethers", async () => {
        await truffleAssert.passes(instance.sendMoney({value: twice, from: buyer}));
    });

    it("should not allow any other method than sendMoney() to be called", async () => {
        await truffleAssert.reverts(instance.release({from: buyer}));
        await truffleAssert.reverts(instance.release({from: seller}));
        await truffleAssert.reverts(instance.release({from: other}));
        await truffleAssert.reverts(instance.withdrawMoney({from: buyer}));
        await truffleAssert.reverts(instance.withdrawMoney({from: seller}));
        await truffleAssert.reverts(instance.withdrawMoney({from: other}));
    });

    contract("after receiving Ethers from the buyer", async () => {

        let tx;
        beforeEach(async () => {
            tx = await instance.sendMoney({value: twice, from: buyer});
        });

        it("should be LOCKED", async () => {
            // LOCKED state == 2
            // eqn - BN equals a Number
            assert((await instance.getState()).eqn(2), "contract not in LOCKED state");
        });

        it("should emit a Transfer event", async () => {
            await truffleAssert.eventEmitted(tx, "Transfer", ev => {
                return ev.from === buyer && ev.amount.eq(twice);
            });
        });

        it("should emit a Locked event", async () => {
            await truffleAssert.eventEmitted(tx, "Locked");
        });

        it("should have balance equal to four times the value", async () => {
            assert((await instance.getBalance()).eq(fourTimes), "balance not equal to four times the price!");
        });
    });
});

contract("DoubleAdvance in state AWAITING_OTHER (after receiving Ethers from buyer)", accounts => {
    let seller = accounts[0];
    let buyer = accounts[1];
    let other = accounts[2];
    let instance;

    beforeEach(async () => {
        instance = await DoubleAdvance.new(seller, buyer, price);
        await instance.sendMoney({value: twice, from: buyer});
    });

    it("should not allow the buyer to send Ethers again", async () => {
        await truffleAssert.reverts(instance.sendMoney({value: twice, from: buyer}));
    });

    it("should not allow others to send Ethers", async () => {
        await truffleAssert.reverts(instance.sendMoney({value: twice, from: other}));
    });

    it("should allow the seller to send Ethers", async () => {
        await truffleAssert.passes(instance.sendMoney({value: twice, from: seller}));
    });

    it("should not allow any other method than sendMoney() to be called", async () => {
        await truffleAssert.reverts(instance.release({from: buyer}));
        await truffleAssert.reverts(instance.release({from: seller}));
        await truffleAssert.reverts(instance.release({from: other}));
        await truffleAssert.reverts(instance.withdrawMoney({from: buyer}));
        await truffleAssert.reverts(instance.withdrawMoney({from: seller}));
        await truffleAssert.reverts(instance.withdrawMoney({from: other}));
    });

    contract("after receiving Ethers from the seller", async () => {

        let tx;
        beforeEach(async () => {
            tx = await instance.sendMoney({value: twice, from: seller});
        });

        it("should be LOCKED", async () => {
            // LOCKED state == 2
            // eqn - BN equals a Number
            assert((await instance.getState()).eqn(2), "contract not in LOCKED state");
        });

        it("should emit a Transfer event", async () => {
            await truffleAssert.eventEmitted(tx, "Transfer", ev => {
                return ev.from === seller && ev.amount.eq(twice);
            });
        });

        it("should emit a Locked event", async () => {
            await truffleAssert.eventEmitted(tx, "Locked");
        });

        it("should have balance equal to four times the value", async () => {
            assert((await instance.getBalance()).eq(fourTimes), "balance not equal to four times the price!");
        });
    });
});

contract("DoubleAdvance in state LOCKED", accounts => {
    let seller = accounts[0];
    let buyer = accounts[1];
    let other = accounts[2];
    let instance;

    beforeEach(async () => {
        instance = await DoubleAdvance.new(seller, buyer, price);
        await instance.sendMoney({value: twice, from: buyer});
        await instance.sendMoney({value: twice, from: seller});
    });

    it("should not allow any other method than release() to be called", async () => {
        await truffleAssert.reverts(instance.sendMoney({value: twice, from: buyer}));
        await truffleAssert.reverts(instance.sendMoney({value: twice, from: seller}));
        await truffleAssert.reverts(instance.sendMoney({value: twice, from: other}));
        await truffleAssert.reverts(instance.withdrawMoney({from: buyer}));
        await truffleAssert.reverts(instance.withdrawMoney({from: seller}));
        await truffleAssert.reverts(instance.withdrawMoney({from: other}));
    });

    it("should not allow the seller to release the Ethers", async () => {
        await truffleAssert.reverts(instance.release({from: seller}));
    });

    it("should not allow others to release the Ethers", async () => {
        await truffleAssert.reverts(instance.release({from: other}));
    });

    it("should allow the buyer to release the Ethers", async () => {
        await truffleAssert.passes(instance.release({from: buyer}));
    });

    contract("after the buyer releases the Ethers", async () => {
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

        it("should have balance equal to four times the price", async () => {
            assert((await instance.getBalance()).eq(fourTimes), "balance not equal to price!");
        });
    });
});

contract("DoubleAdvance in state RELEASED (before any withdrawals)", accounts => {
    let seller = accounts[0];
    let buyer = accounts[1];
    let other = accounts[2];
    let instance;

    beforeEach(async () => {
        instance = await DoubleAdvance.new(seller, buyer, price);
        await instance.sendMoney({value: twice, from: buyer});
        await instance.sendMoney({value: twice, from: seller});
        await instance.release({from: buyer});
    });

    it("should not allow any other method than withdrawMoney() to be called", async () => {
        await truffleAssert.reverts(instance.release({from: buyer}));
        await truffleAssert.reverts(instance.release({from: seller}));
        await truffleAssert.reverts(instance.release({from: other}));
        await truffleAssert.reverts(instance.sendMoney({value: twice, from: buyer}));
        await truffleAssert.reverts(instance.sendMoney({value: price, from: seller}));
        await truffleAssert.reverts(instance.sendMoney({value: price, from: other}));
    });

    it("should not allow others to withdraw Ethers", async () => {
        await truffleAssert.reverts(instance.withdrawMoney({from: other}));
    });

    it("should allow the buyer to withdraw Ethers", async () => {
        await truffleAssert.passes(instance.withdrawMoney({from: buyer}));
    });

    it("should allow the seller to withdraw Ethers", async () => {
        await truffleAssert.passes(instance.withdrawMoney({from: seller}));
    });

    contract("after the seller withdraws their Ethers", async () => {
        let tx;
        beforeEach(async () => {
            tx = await instance.withdrawMoney({from: seller});
        });

        it("should emit a Withdrawal event", async () => {
            await truffleAssert.eventEmitted(tx, "Withdrawal", ev => {
                return ev.to === seller && ev.amount.eq(thrice);
            });
        });

        it("should not emit a Completed event", async () => {
            await truffleAssert.eventNotEmitted(tx, "Completed");
        });

        it("should stay in RELEASED state", async () => {
            // RELEASED state == 3
            // eqn - BN equals a Number
            assert((await instance.getState()).eqn(3), "contract not in RELEASED state");
        });

        it("should have balance equal to the price", async () => {
            assert((await instance.getBalance()).eq(price), "balance not equal to the price!");
        });
    });

    contract("after the buyer withdraws their Ethers", async () => {
        let tx;
        beforeEach(async () => {
            tx = await instance.withdrawMoney({from: buyer});
        });

        it("should emit a Withdrawal event", async () => {
            await truffleAssert.eventEmitted(tx, "Withdrawal", ev => {
                return ev.to === buyer && ev.amount.eq(price);
            });
        });

        it("should not emit a Completed event", async () => {
            await truffleAssert.eventNotEmitted(tx, "Completed");
        });

        it("should stay in RELEASED state", async () => {
            // RELEASED state == 3
            // eqn - BN equals a Number
            assert((await instance.getState()).eqn(3), "contract not in RELEASED state");
        });

        it("should have balance equal to three times the price", async () => {
            assert((await instance.getBalance()).eq(thrice), "balance not equal to three times the price!");
        });
    });
});

contract("DoubleAdvance in state RELEASED (after the seller withdraws their Ethers", accounts => {
    let seller = accounts[0];
    let buyer = accounts[1];
    let other = accounts[2];
    let instance;

    beforeEach(async () => {
        instance = await DoubleAdvance.new(seller, buyer, price);
        await instance.sendMoney({value: twice, from: buyer});
        await instance.sendMoney({value: twice, from: seller});
        await instance.release({from: buyer});
        await instance.withdrawMoney({from: seller});
    });

    it("should not allow any other method than withdrawMoney() to be called", async () => {
        await truffleAssert.reverts(instance.release({from: buyer}));
        await truffleAssert.reverts(instance.release({from: seller}));
        await truffleAssert.reverts(instance.release({from: other}));
        await truffleAssert.reverts(instance.sendMoney({value: twice, from: buyer}));
        await truffleAssert.reverts(instance.sendMoney({value: price, from: seller}));
        await truffleAssert.reverts(instance.sendMoney({value: price, from: other}));
    });

    it("should allow the buyer to withdraw Ethers", async () => {
        await truffleAssert.passes(instance.withdrawMoney({from: buyer}));
    });

    it("should not allow the seller to withdraw Ethers", async () => {
        await truffleAssert.reverts(instance.withdrawMoney({from: seller}));
    });

    it("should not allow others to withdraw Ethers", async () => {
        await truffleAssert.reverts(instance.withdrawMoney({from: other}));
    });

    contract("after the buyer withdraws their Ethers", async () => {
        let tx;
        beforeEach(async () => {
            tx = await instance.withdrawMoney({from: buyer});
        });

        it("should emit a Withdrawal event", async () => {
            await truffleAssert.eventEmitted(tx, "Withdrawal", ev => {
                return ev.to === buyer && ev.amount.eq(price);
            });
        });

        it("should emit a Completed event", async () => {
            await truffleAssert.eventEmitted(tx, "Completed");
        });

        it("should be in COMPLETED state", async () => {
            // COMPLETED state == 4
            // eqn - BN equals a Number
            assert((await instance.getState()).eqn(4), "contract not in COMPLETED state");
        });

        it("should have balance equal to zero", async () => {
            assert((await instance.getBalance()).isZero(), "balance not equal to zero!");
        });
    });
});

contract("DoubleAdvance in state RELEASED (after the buyer withdraws their Ethers", accounts => {
    let seller = accounts[0];
    let buyer = accounts[1];
    let other = accounts[2];
    let instance;

    beforeEach(async () => {
        instance = await DoubleAdvance.new(seller, buyer, price);
        await instance.sendMoney({value: twice, from: buyer});
        await instance.sendMoney({value: twice, from: seller});
        await instance.release({from: buyer});
        await instance.withdrawMoney({from: buyer});
    });

    it("should not allow any other method than withdrawMoney() to be called", async () => {
        await truffleAssert.reverts(instance.release({from: buyer}));
        await truffleAssert.reverts(instance.release({from: seller}));
        await truffleAssert.reverts(instance.release({from: other}));
        await truffleAssert.reverts(instance.sendMoney({value: twice, from: buyer}));
        await truffleAssert.reverts(instance.sendMoney({value: price, from: seller}));
        await truffleAssert.reverts(instance.sendMoney({value: price, from: other}));
    });

    it("should allow the seller to withdraw Ethers", async () => {
        await truffleAssert.passes(instance.withdrawMoney({from: seller}));
    });

    it("should not allow the buyer to withdraw Ethers", async () => {
        await truffleAssert.reverts(instance.withdrawMoney({from: buyer}));
    });

    it("should not allow others to withdraw Ethers", async () => {
        await truffleAssert.reverts(instance.withdrawMoney({from: other}));
    });

    contract("after the seller withdraws their Ethers", async () => {
        let tx;
        beforeEach(async () => {
            tx = await instance.withdrawMoney({from: seller});
        });

        it("should emit a Withdrawal event", async () => {
            await truffleAssert.eventEmitted(tx, "Withdrawal", ev => {
                return ev.to === seller && ev.amount.eq(thrice);
            });
        });

        it("should emit a Completed event", async () => {
            await truffleAssert.eventEmitted(tx, "Completed");
        });

        it("should be in COMPLETED state", async () => {
            // COMPLETED state == 4
            // eqn - BN equals a Number
            assert((await instance.getState()).eqn(4), "contract not in COMPLETED state");
        });

        it("should have balance equal to zero", async () => {
            assert((await instance.getBalance()).isZero(), "balance not equal to zero!");
        });
    });
});

contract("DoubleAdvance in state COMPLETE", accounts => {
    let seller = accounts[0];
    let buyer = accounts[1];
    let other = accounts[2];
    let instance;

    beforeEach(async () => {
        instance = await DoubleAdvance.new(seller, buyer, price);
        await instance.sendMoney({value: twice, from: buyer});
        await instance.sendMoney({value: twice, from: seller});
        await instance.release({from: buyer});
        await instance.withdrawMoney({from: buyer});
        await instance.withdrawMoney({from: seller});
    });

    it("should not allow any methods to be executed", async () => {
        await truffleAssert.reverts(instance.sendMoney({value: twice, from: buyer}));
        await truffleAssert.reverts(instance.sendMoney({value: twice, from: seller}));
        await truffleAssert.reverts(instance.sendMoney({value: twice, from: other}));
        await truffleAssert.reverts(instance.release({from: buyer}));
        await truffleAssert.reverts(instance.release({from: seller}));
        await truffleAssert.reverts(instance.release({from: other}));
        await truffleAssert.reverts(instance.withdrawMoney({from: buyer}));
        await truffleAssert.reverts(instance.withdrawMoney({from: seller}));
        await truffleAssert.reverts(instance.withdrawMoney({from: other}));
    });
});
