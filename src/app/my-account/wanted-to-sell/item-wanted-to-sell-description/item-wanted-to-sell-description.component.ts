import {Component, Input} from "@angular/core";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {ItemWantedToSell} from "@my-account/data/ItemWantedToSell";
import {Item} from "@items/data/Item";

@Component({
    selector: "item-wanted-to-sell-description",
    templateUrl: "./item-wanted-to-sell-description.component.html",
    styleUrls: ["./item-wanted-to-sell-description.component.scss"]
})
export class ItemWantedToSellDescriptionComponent {

    strings = {
        you: "You",
        category: Item.CATEGORY_LABEL,
        itemClosed: Item.CLOSED_ON_LABEL,
        addedBy: Item.ADDED_BY,
        addedOn: Item.ADDED_ON_LABEL
    };

    @Input() item: ItemWantedToSell | undefined;

    constructor(private domSanitizer: DomSanitizer) {
    }

    get photoUrl(): SafeUrl | undefined {
        return this.item ? this.domSanitizer.bypassSecurityTrustUrl(this.item.photoUrl) : undefined;
    }
}
