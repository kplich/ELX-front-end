import {Component, Input, OnInit} from "@angular/core";
import {Offer} from "@conversation/data/offer/Offer";
import {OfferType} from "@conversation/data/OfferType";
export const STRINGS = {
    labels: {
        offerType: "Offer type",
        price: "Price",
        advance: "Advance",
    },
    offerTypes: {
        plainAdvance: OfferType.PLAIN_ADVANCE,
        doubleAdvance: OfferType.DOUBLE_ADVANCE
    }
};

@Component({template: ""})
export abstract class ItemBoughtContractComponent<O extends Offer> implements OnInit {

    strings = STRINGS;

    @Input() offer: O | undefined;
    @Input() contract: any | undefined;

    protected constructor() {
    }

    ngOnInit() {

    }
}
