import {Component, Input} from "@angular/core";
import {ItemBought} from "@my-account/data/items/ItemBought";
import {PlainAdvanceOffer} from "@conversation/data/offer/PlainAdvanceOffer";
import {DoubleAdvanceOffer} from "@conversation/data/offer/DoubleAdvanceOffer";

@Component({
    selector: "item-bought",
    templateUrl: "./item-bought.component.html",
    styleUrls: ["./item-bought.component.scss"]
})
export class ItemBoughtComponent {

    @Input() item: ItemBought | undefined;

    get offerIsPlainAdvance(): boolean {
        if (this.item) {
            return this.item?.offer instanceof PlainAdvanceOffer;
        } else {
            return false;
        }
    }

    get offerAsPlainAdvance(): PlainAdvanceOffer {
        return this.item?.offer as PlainAdvanceOffer;
    }

    get offerIsDoubleAdvance(): boolean {
        if (this.item) {
            return this.item.offer instanceof DoubleAdvanceOffer;
        } else {
            return false;
        }
    }

    get offerAsDoubleAdvance(): DoubleAdvanceOffer {
        return this.item?.offer as DoubleAdvanceOffer;
    }
}
