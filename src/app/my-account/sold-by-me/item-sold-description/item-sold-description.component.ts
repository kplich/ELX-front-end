import {Component, Input} from "@angular/core";
import {SafeUrl, DomSanitizer} from "@angular/platform-browser";
import {ItemSoldByMe} from "@my-account/data/ItemSoldByMe";
import {Item} from "@items/data/Item";

@Component({
    selector: "item-sold-description",
    templateUrl: "./item-sold-description.component.html",
    styleUrls: ["./item-sold-description.component.scss"]
})
export class ItemSoldDescriptionComponent {

    strings = {
        you: "You",
        category: Item.CATEGORY_LABEL,
        itemClosed: Item.CLOSED_ON_LABEL,
        addedBy: Item.ADDED_BY,
        addedOn: Item.ADDED_ON_LABEL
    };

    @Input() item: ItemSoldByMe | undefined;

    constructor(private domSanitizer: DomSanitizer) {}

    get photoUrl(): SafeUrl | undefined {
        return this.item ? this.domSanitizer.bypassSecurityTrustUrl(this.item.photoUrl) : undefined;
    }
}
