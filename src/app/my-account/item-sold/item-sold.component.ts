import {Component, Input} from "@angular/core";
import {ItemBought} from "@my-account/data/items/ItemBought";
import {PlainAdvanceOffer} from "@conversation/data/offer/PlainAdvanceOffer";
import {DoubleAdvanceOffer} from "@conversation/data/offer/DoubleAdvanceOffer";

@Component({
    selector: "item-sold",
    templateUrl: "./item-sold.component.html",
    styleUrls: ["./item-sold.component.scss"]
})
export class ItemSoldComponent {
    @Input() item: ItemBought | undefined;

    get offerIsPlainAdvance(): boolean {
        return this.item?.offer instanceof PlainAdvanceOffer;
    }

    get offerAsPlainAdvance(): PlainAdvanceOffer | undefined {
        return this.item ? this.item.offer as PlainAdvanceOffer : undefined;
    }

    get offerIsDoubleAdvance(): boolean {
        return this.item?.offer instanceof DoubleAdvanceOffer;
    }

    get offerAsDoubleAdvance(): DoubleAdvanceOffer | undefined {
        return this.item ? this.item.offer as DoubleAdvanceOffer : undefined;
    }
}
