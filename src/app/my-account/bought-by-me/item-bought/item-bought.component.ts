import { Component, Input } from "@angular/core";
import {ItemBoughtByMe} from "@my-account/data/ItemBoughtByMe";
import {PlainAdvanceOffer} from "@conversation/data/offer/PlainAdvanceOffer";
import {DoubleAdvanceOffer} from "@conversation/data/offer/DoubleAdvanceOffer";

@Component({
  selector: "app-item-bought",
  templateUrl: "./item-bought.component.html",
  styleUrls: ["./item-bought.component.scss"]
})
export class ItemBoughtComponent {

    @Input() item: ItemBoughtByMe | undefined;

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
