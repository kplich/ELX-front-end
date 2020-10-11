import {Component, Input} from "@angular/core";
import {OfferType} from "@conversation/data/OfferType";
import {Offer} from "@conversation/data/offer/Offer";
import {ContractStateString} from "@my-account/data/ContractState";
import {Item} from "@items/data/Item";

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

    strings = STRINGS;

    @Input() offer!: O;
    contract!: any;

    balance!: number;
    state!: ContractStateString;
}
