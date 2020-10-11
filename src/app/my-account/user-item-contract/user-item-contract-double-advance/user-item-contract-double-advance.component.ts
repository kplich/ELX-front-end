import {Component, OnInit} from "@angular/core";
import {UserItemContractComponent} from "@my-account/user-item-contract/user-item-contract.component";
import {DoubleAdvanceOffer} from "@conversation/data/offer/DoubleAdvanceOffer";
import {Web3Service} from "@shared/web3/web3.service";
import {OfferType} from "@conversation/data/OfferType";
import {contractStateToString} from "@my-account/data/ContractState";
import {OfferContractService} from "@shared/offer-contract/offer-contract.service";

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
        private web3Service: Web3Service) {
        super();
    }

    async ngOnInit() {
        if (this.offer.contractAddress) {
            this.contract = await this.offerContractService
                .getContractAtAddress(OfferType.DOUBLE_ADVANCE, this.offer.contractAddress);

            this.state = contractStateToString((await this.contract.state()).toNumber());
            this.balance = await this.web3Service.getBalance(this.offer.contractAddress);
        }
        else {
            console.warn("no contract address!");
        }
    }
}
