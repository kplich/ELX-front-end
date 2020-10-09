import {Component, OnInit, Input} from "@angular/core";
import {ItemBought} from "@my-account/data/ItemBought";
import {OfferContractService} from "@shared/offer-contract/offer-contract.service";
import {OfferType} from "@conversation/data/OfferType";
import {PlainAdvanceOffer} from "@conversation/data/offer/PlainAdvanceOffer";
import {DoubleAdvanceOffer} from "@conversation/data/offer/DoubleAdvanceOffer";

@Component({
    selector: "item-sold",
    templateUrl: "./item-sold.component.html",
    styleUrls: ["./item-sold.component.scss"]
})
export class ItemSoldComponent implements OnInit {

    @Input() item: ItemBought | undefined;

    contract: any | undefined = undefined;

    constructor(private offerContractService: OfferContractService) {
    }

    async ngOnInit() {
        if (this.item) {
            if (this.item.offer.contractAddress) {
                if (this.offerIsPlainAdvance) {
                    this.contract = await this.offerContractService
                        .getContractAtAddress(OfferType.PLAIN_ADVANCE, this.item.offer.contractAddress);
                } else if (this.offerIsDoubleAdvance) {
                    this.contract = await this.offerContractService
                        .getContractAtAddress(OfferType.DOUBLE_ADVANCE, this.item.offer.contractAddress);
                }
                console.log(this.contract);
            }
            else {
                console.warn("offer doesn't have a contract address!");
            }
        }
        else {
            console.warn("item bought is undefined!");
        }
    }

    get offerIsPlainAdvance(): boolean {
        return this.item?.offer instanceof PlainAdvanceOffer;
    }

    get offerAsPlainAdvance(): PlainAdvanceOffer | undefined {
        return this.item ? this.item.offer as PlainAdvanceOffer : undefined;
    }

    get offerIsDoubleAdvance(): boolean {
        return this.item?.offer instanceof DoubleAdvanceOffer;
    }

    get offerAsDoubleAdvance(): DoubleAdvanceOffer | undefined {
        return this.item ? this.item.offer as DoubleAdvanceOffer : undefined;
    }

}
