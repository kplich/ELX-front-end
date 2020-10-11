import {Component, OnInit} from "@angular/core";
import {UserItemContractComponent} from "@my-account/user-item-contract/user-item-contract.component";
import {PlainAdvanceOffer} from "@conversation/data/offer/PlainAdvanceOffer";
import {Web3Service} from "@shared/web3/web3.service";
import {ContractStateString} from "@my-account/data/ContractState";
import {OfferContractService} from "@shared/offer-contract/offer-contract.service";
import {OfferType} from "@conversation/data/OfferType";
import {LoggedInUserService} from "@shared/logged-in-user/logged-in-user.service";

@Component({
    selector: "user-item-contract-plain-advance",
    templateUrl: "./user-item-contract-plain-advance.component.html",
    styleUrls: ["../user-item-contract.component.scss"]
})
export class UserItemContractPlainAdvanceComponent
    extends UserItemContractComponent<PlainAdvanceOffer>
    implements OnInit {

    constructor(
        private offerContractService: OfferContractService,
        private web3Service: Web3Service,
        loggedInUserService: LoggedInUserService) {
        super(loggedInUserService);
    }

    async ngOnInit() {
        if (this.offer.contractAddress) {
            this.contract = await this.offerContractService
                .getContractAtAddress(OfferType.PLAIN_ADVANCE, this.offer.contractAddress);

            console.log(this.contract);

            await this.loadDataFromBlockchain();
        }
        else {
            console.warn("no contract address!");
        }
    }

    async sendMoney() {
        const result = await this.contract.sendMoney({
            from: this.buyerAddress,
            value: this.offer.price * UserItemContractPlainAdvanceComponent.ETH_TO_WEI
        });
        console.log(result);

        await this.loadDataFromBlockchain();
    }

    async withdrawMoney() {
        const result = await this.contract.withdrawMoney({from: this.sellerAddress});
        console.log(result);

        await this.loadDataFromBlockchain();
    }

    get moneyCannotBeSent(): boolean {
        return !this.loggedInUserIsBuyer || this.state !== ContractStateString.CREATED;
    }

    get moneyCannotBeWithdrawn(): boolean {
        return !this.loggedInUserIsSeller || this.state !== ContractStateString.RELEASED;
    }

    async refreshState() {
        await this.loadStateFromBlockchain();
    }
}
