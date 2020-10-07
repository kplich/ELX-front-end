import {Component} from "@angular/core";
import {ItemBoughtContractComponent} from "@bought-by-me/item-bought-offer/item-bought-contract.component";
import {DoubleAdvanceOffer} from "@conversation/data/offer/DoubleAdvanceOffer";

@Component({
    selector: "app-item-bought-contract-double-advance",
    templateUrl: "./item-bought-contract-double-advance.component.html",
    styleUrls: ["./../item-bought-contract.component.scss"]
})
export class ItemBoughtContractDoubleAdvanceComponent extends ItemBoughtContractComponent<DoubleAdvanceOffer> {

    constructor() {
        super();
    }

}
