import {Component, Input} from "@angular/core";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {Item} from "@items/data/Item";
import {ItemWantedByMe} from "@my-account/data/ItemWantedByMe";

@Component({
    selector: "item-wanted-description",
    templateUrl: "./item-wanted-description.component.html",
    styleUrls: ["./item-wanted-description.component.scss"]
})
export class ItemWantedDescriptionComponent {

    strings = {
        category: Item.CATEGORY_LABEL,
        itemClosed: Item.CLOSED_ON_LABEL,
        addedBy: Item.ADDED_BY,
        addedOn: Item.ADDED_ON_LABEL
    };

    @Input() item: ItemWantedByMe | undefined;

    constructor(private domSanitizer: DomSanitizer) {
    }

    get photoUrl(): SafeUrl | undefined {
        return this.item ? this.domSanitizer.bypassSecurityTrustUrl(this.item.photoUrl) : undefined;
    }
}
