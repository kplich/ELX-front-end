import {Component, Input} from "@angular/core";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {Item} from "@items/data/Item";
import {ItemWantedToBuy} from "@my-account/data/ItemWantedToBuy";

@Component({
    selector: "item-wanted-to-buy-description",
    templateUrl: "./item-wanted-to-buy-description.component.html",
    styleUrls: ["./item-wanted-to-buy-description.component.scss"]
})
export class ItemWantedToBuyDescriptionComponent {

    strings = {
        category: Item.CATEGORY_LABEL,
        itemClosed: Item.CLOSED_ON_LABEL,
        addedBy: Item.ADDED_BY,
        addedOn: Item.ADDED_ON_LABEL
    };

    @Input() item: ItemWantedToBuy | undefined;

    constructor(private domSanitizer: DomSanitizer) {
    }

    get photoUrl(): SafeUrl | undefined {
        return this.item ? this.domSanitizer.bypassSecurityTrustUrl(this.item.photoUrl) : undefined;
    }
}
