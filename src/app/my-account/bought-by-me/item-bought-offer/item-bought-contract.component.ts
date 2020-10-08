import {Component, Input, OnInit} from "@angular/core";
import {Offer} from "@conversation/data/offer/Offer";
import {OfferType} from "@conversation/data/OfferType";
import {ContractStateString, contractStateToString} from "@my-account/data/ContractState";
import * as BN from "bn.js";

export const STRINGS = {
    labels: {
        offerType: "Offer type",
        price: "Price",
        advance: "Advance",
        contractStatus: "Contract status",
        seeDetails: "See details"
    },
    offerTypes: {
        plainAdvance: OfferType.PLAIN_ADVANCE,
        doubleAdvance: OfferType.DOUBLE_ADVANCE
    }
};

@Component({ template: "" })
export abstract class ItemBoughtContractComponent<O extends Offer> implements OnInit {

    strings = STRINGS;

    @Input() offer: O | undefined;
    @Input() contract: any | undefined;

    state: ContractStateString | undefined;

    protected constructor() {
    }

    ngOnInit() {
        // HACK: this.contract is undefined as this is executed
        setTimeout(() => {
            if (this.contract !== undefined) {
                this.contract.state().then((result: BN) => {
                    console.log(result);
                    this.state = contractStateToString(result.toNumber());
                });
                console.log(this.state);
            }
            else {
                console.warn("contract is undefined!");
                this.state = undefined;
            }
        }, 1000);
    }
}
