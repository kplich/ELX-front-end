import {Component, OnInit} from "@angular/core";
import {UserItemContractComponent} from "@my-account/user-item-contract/user-item-contract.component";
import {PlainAdvanceOffer} from "@conversation/data/offer/PlainAdvanceOffer";
import {Web3Service} from "@shared/web3/web3.service";
import {contractStateToString} from "@my-account/data/ContractState";
import {OfferContractService} from "@shared/offer-contract/offer-contract.service";
import {OfferType} from "@conversation/data/OfferType";

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
        private web3Service: Web3Service) {
        super();
    }

    async ngOnInit() {
        if (this.offer.contractAddress) {
            this.contract = await this.offerContractService
                .getContractAtAddress(OfferType.PLAIN_ADVANCE, this.offer.contractAddress);

            console.log(this.contract);

            this.state = contractStateToString((await this.contract.state()).toNumber());
            this.balance = await this.web3Service.getBalance(this.offer.contractAddress);
        }
        else {
            console.warn("no contract address!");
        }
    }

}
