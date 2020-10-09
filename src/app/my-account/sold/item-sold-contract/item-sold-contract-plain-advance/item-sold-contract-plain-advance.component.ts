import {Component} from "@angular/core";
import {ItemSoldContractComponent} from "@sold/item-sold-contract/item-sold-contract.component";
import {PlainAdvanceOffer} from "@conversation/data/offer/PlainAdvanceOffer";

@Component({
    selector: "item-sold-contract-plain-advance",
    templateUrl: "./item-sold-contract-plain-advance.component.html",
    styleUrls: ["./../item-sold-contract.component.scss"]
})
export class ItemSoldContractPlainAdvanceComponent extends ItemSoldContractComponent<PlainAdvanceOffer> {

    constructor() {
        super();
    }
}
