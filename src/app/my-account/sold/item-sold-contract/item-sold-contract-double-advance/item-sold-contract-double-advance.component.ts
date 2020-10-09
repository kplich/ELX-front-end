import {Component} from "@angular/core";
import {ItemSoldContractComponent} from "@sold/item-sold-contract/item-sold-contract.component";
import {DoubleAdvanceOffer} from "@conversation/data/offer/DoubleAdvanceOffer";

@Component({
    selector: "item-sold-contract-double-advance",
    templateUrl: "./item-sold-contract-double-advance.component.html",
    styleUrls: ["./../item-sold-contract.component.scss"]
})
export class ItemSoldContractDoubleAdvanceComponent extends ItemSoldContractComponent<DoubleAdvanceOffer> {

    constructor() {
        super();
    }
}
