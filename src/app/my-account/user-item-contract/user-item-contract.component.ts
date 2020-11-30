import {Component, Input} from "@angular/core";
import {OfferType} from "@conversation/data/OfferType";
import {Offer} from "@conversation/data/offer/Offer";
import {ContractStateString, contractStateToString} from "@my-account/data/ContractState";
import {Item} from "@items/data/Item";
import {LoggedInUserService} from "@shared/logged-in-user/logged-in-user.service";
import {Web3Service} from "@shared/web3/web3.service";
import {SnackBarService} from "@shared/snack-bar-service/snack-bar.service";

/**
 * Labels used in the component.
 */
export const STRINGS = {
    labels: {
        offer: {
            offerType: "Offer type",
            price: "Price",
            advance: "Advance"
        },
        contract: {
            address: "Contract address",
            status: "Contract status",
            balance: "Balance",
            ethereumSymbol: Item.ETH_SYMBOL,
        }
    },
    offerTypes: {
        plainAdvance: OfferType.PLAIN_ADVANCE,
        doubleAdvance: OfferType.DOUBLE_ADVANCE
    }
};

@Component({
    template: ""
})
export abstract class UserItemContractComponent<O extends Offer> {
    protected static ETH_TO_WEI = 10 ** 18;

    strings = STRINGS;

    @Input() offer!: O;
    contract!: any;

    balance!: number;
    state!: ContractStateString;

    sellerAddress!: string;
    buyerAddress!: string;

    protected constructor(
        protected loggedInUserService: LoggedInUserService,
        protected web3Service: Web3Service,
        protected snackBarService: SnackBarService) {
    }

    get fundsCannotBeReleased(): boolean {
        return !this.loggedInUserIsBuyer || this.state !== ContractStateString.LOCKED;
    }

    get contractIsCompleted(): boolean {
        return this.state === ContractStateString.COMPLETED;
    }

    get loggedInUserIsSeller(): boolean {
        const loggedInUser = this.loggedInUserService.authenticatedUser;

        if (loggedInUser) {
            if (loggedInUser.ethereumAddress) {
                return loggedInUser.ethereumAddress === this.sellerAddress;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    get loggedInUserIsBuyer(): boolean {
        const loggedInUser = this.loggedInUserService.authenticatedUser;

        if (loggedInUser) {
            if (loggedInUser.ethereumAddress) {
                return loggedInUser.ethereumAddress === this.buyerAddress;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    async releaseFunds() {
        if (this.web3Service.accounts[0] !== this.buyerAddress) {
            this.snackBarService.openSnackBar("Log in as a buyer to release the funds!");
            return;
        }

        await this.contract.release({from: this.buyerAddress});
        await this.loadStateFromBlockchain();
    }

    protected async loadDataFromBlockchain() {
        this.buyerAddress = await this.contract.buyer();
        this.sellerAddress = await this.contract.seller();

        await this.loadStateFromBlockchain();
    }

    protected async loadStateFromBlockchain() {
        if (this.offer.contractAddress) {
            this.state = contractStateToString((await this.contract.getState()).toNumber());
            const balanceString = (await this.contract.getBalance()).toString();
            this.balance = Number(balanceString) / UserItemContractComponent.ETH_TO_WEI;
        } else {
            console.warn("no contract address!");
        }
    }
}
