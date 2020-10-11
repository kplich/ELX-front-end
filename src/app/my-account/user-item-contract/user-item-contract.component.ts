import {Component, Input} from "@angular/core";
import {OfferType} from "@conversation/data/OfferType";
import {Offer} from "@conversation/data/offer/Offer";
import {ContractStateString, contractStateToString} from "@my-account/data/ContractState";
import {Item} from "@items/data/Item";
import {LoggedInUserService} from "@shared/logged-in-user/logged-in-user.service";

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

    protected constructor(private loggedInUserService: LoggedInUserService) {
    }

    protected async loadDataFromBlockchain() {
        this.buyerAddress = await this.contract.buyer();
        this.sellerAddress = await this.contract.seller();

        await this.loadStateFromBlockchain();
    }

    protected async loadStateFromBlockchain() {
        if (this.offer.contractAddress) {
            this.state = contractStateToString((await this.contract.state()).toNumber());
            this.balance = await this.web3Service.getBalance(this.offer.contractAddress);
        }
        else {
            console.warn("no contract address!");
        }
    }

    async releaseFunds() {
        const result = await this.contract.release({from: this.sellerAddress});
        console.log(result);

        await this.loadStateFromBlockchain();
    }

    protected get loggedInUserIsSeller(): boolean {
        const loggedInUser = this.loggedInUserService.authenticatedUser;

        if (loggedInUser) {
            if (loggedInUser.ethereumAddress) {
                return loggedInUser.ethereumAddress === this.sellerAddress;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }

    protected get loggedInUserIsBuyer(): boolean {
        const loggedInUser = this.loggedInUserService.authenticatedUser;

        if (loggedInUser) {
            if (loggedInUser.ethereumAddress) {
                return loggedInUser.ethereumAddress === this.buyerAddress;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
}
