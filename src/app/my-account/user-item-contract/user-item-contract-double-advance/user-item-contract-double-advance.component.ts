import {Component, OnInit} from "@angular/core";
import {UserItemContractComponent} from "@my-account/user-item-contract/user-item-contract.component";
import {DoubleAdvanceOffer} from "@conversation/data/offer/DoubleAdvanceOffer";
import {Web3Service} from "@shared/web3/web3.service";
import {OfferType} from "@conversation/data/OfferType";
import {OfferContractService} from "@shared/offer-contract/offer-contract.service";
import {LoggedInUserService} from "@shared/logged-in-user/logged-in-user.service";
import {SnackBarService} from "@shared/snack-bar-service/snack-bar.service";
import {ContractStateString} from "@my-account/data/ContractState";

@Component({
    selector: "user-item-contract-double-advance",
    templateUrl: "./user-item-contract-double-advance.component.html",
    styleUrls: ["../user-item-contract.component.scss"]
})
export class UserItemContractDoubleAdvanceComponent
    extends UserItemContractComponent<DoubleAdvanceOffer>
    implements OnInit {

    constructor(
        private offerContractService: OfferContractService,
        web3Service: Web3Service,
        loggedInUserService: LoggedInUserService,
        snackBarService: SnackBarService) {
        super(loggedInUserService, web3Service, snackBarService);
    }

    async ngOnInit() {
        if (this.offer.contractAddress) {

            if (this.web3Service.web3 !== null) {
                this.contract = await this.offerContractService
                    .getContractAtAddress(OfferType.DOUBLE_ADVANCE, this.offer.contractAddress);

                await this.loadDataFromBlockchain();
            }
            else {
                this.contract = undefined;
            }
        }
        else {
            console.warn("no contract address!");
        }
    }

    async sendMoney() {
        if (this.web3Service.accounts[0] !== this.buyerAddress
                && this.web3Service.accounts[0] !== this.sellerAddress) {
            this.snackBarService.openSnackBar("Log in to your Ethereum account to send money!");
            return;
        }

        await this.contract.sendMoney({
            from: this.web3Service.accounts[0],
            value: this.offer.price * 2 * UserItemContractComponent.ETH_TO_WEI
        });
        await this.loadDataFromBlockchain();
    }

    async withdrawMoney() {
        if (this.web3Service.accounts[0] !== this.buyerAddress
                && this.web3Service.accounts[0] !== this.sellerAddress) {
            this.snackBarService.openSnackBar("Log in to your Ethereum account to send money!");
            return;
        }

        await this.contract.withdrawMoney({from: this.web3Service.accounts[0]});
        await this.loadDataFromBlockchain();
    }

    get moneyCannotBeSent(): boolean {
        return (!this.loggedInUserIsBuyer && !this.loggedInUserIsSeller)
            || (this.state !== ContractStateString.CREATED && this.state !== ContractStateString.AWAITING_OTHER);
    }

    get moneyCannotBeWithdrawn(): boolean {
        return (!this.loggedInUserIsBuyer && !this.loggedInUserIsSeller)
            || this.state !== ContractStateString.RELEASED;
    }

    async refreshState() {
        await this.loadStateFromBlockchain();
    }
}
