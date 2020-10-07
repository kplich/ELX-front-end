import {Component} from "@angular/core";
import {ItemBoughtContractComponent} from "@bought-by-me/item-bought-offer/item-bought-contract.component";
import {PlainAdvanceOffer} from "@conversation/data/offer/PlainAdvanceOffer";

@Component({
    selector: "app-item-bought-contract-plain-advance",
    templateUrl: "./item-bought-contract-plain-advance.component.html",
    styleUrls: ["../item-bought-contract.component.scss"]
})
export class ItemBoughtContractPlainAdvanceComponent extends ItemBoughtContractComponent<PlainAdvanceOffer> {

    constructor() {
        super();
    }

}
