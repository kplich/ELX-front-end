import {Component, Input} from "@angular/core";
import {Offer} from "@conversation/data/offer/Offer";

@Component({ template: "" })
export abstract class ItemBoughtOfferComponent<O extends Offer> {

    @Input() offer: O | undefined;

    protected constructor() {
    }

}
