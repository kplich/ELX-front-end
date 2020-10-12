import {Component, OnInit} from "@angular/core";
import {UserItemContractComponent} from "@my-account/user-item-contract/user-item-contract.component";
import {DoubleAdvanceOffer} from "@conversation/data/offer/DoubleAdvanceOffer";
import {Web3Service} from "@shared/web3/web3.service";
import {OfferType} from "@conversation/data/OfferType";
import {OfferContractService} from "@shared/offer-contract/offer-contract.service";
import {LoggedInUserService} from "@shared/logged-in-user/logged-in-user.service";

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
        loggedInUserService: LoggedInUserService) {
        super(loggedInUserService, web3Service);
    }

    async ngOnInit() {
        if (this.offer.contractAddress) {
            this.contract = await this.offerContractService
                .getContractAtAddress(OfferType.DOUBLE_ADVANCE, this.offer.contractAddress);

            await this.loadDataFromBlockchain();
        }
        else {
            console.warn("no contract address!");
        }
    }
}
