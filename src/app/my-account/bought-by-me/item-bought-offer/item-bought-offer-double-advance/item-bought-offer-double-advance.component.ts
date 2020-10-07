import {Component} from "@angular/core";
import {ItemBoughtOfferComponent} from "@bought-by-me/item-bought-offer/item-bought-offer.component";
import {DoubleAdvanceOffer} from "@conversation/data/offer/DoubleAdvanceOffer";

@Component({
    selector: "app-item-bought-offer-double-advance",
    templateUrl: "./item-bought-offer-double-advance.component.html",
    styleUrls: ["./item-bought-offer-double-advance.component.scss"]
})
export class ItemBoughtOfferDoubleAdvanceComponent extends ItemBoughtOfferComponent<DoubleAdvanceOffer> {

    constructor() {
        super();
    }

}
