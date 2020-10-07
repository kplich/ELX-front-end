import {Component} from "@angular/core";
import {ItemBoughtOfferComponent} from "@bought-by-me/item-bought-offer/item-bought-offer.component";
import {PlainAdvanceOffer} from "@conversation/data/offer/PlainAdvanceOffer";

@Component({
    selector: "app-item-bought-offer-plain-advance",
    templateUrl: "./item-bought-offer-plain-advance.component.html",
    styleUrls: ["./../item-bought-offer.component.scss"]
})
export class ItemBoughtOfferPlainAdvanceComponent extends ItemBoughtOfferComponent<PlainAdvanceOffer> {

    constructor() {
        super();
    }

}
