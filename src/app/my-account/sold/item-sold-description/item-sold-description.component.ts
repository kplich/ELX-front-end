import {Component, Input} from "@angular/core";
import {Item} from "@items/data/Item";
import {ItemBought} from "@my-account/data/ItemBought";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
    selector: "item-sold-description",
    templateUrl: "./item-sold-description.component.html",
    styleUrls: ["./item-sold-description.component.scss"]
})
export class ItemSoldDescriptionComponent {

    strings = {
        category: Item.CATEGORY_LABEL,
        itemClosed: Item.CLOSED_ON_LABEL,
        addedOn: Item.ADDED_ON_LABEL,
        addedByYou: "added by You"
    };

    @Input() item: ItemBought | undefined;

    constructor(private domSanitizer: DomSanitizer) {
    }

    get photoUrl(): SafeUrl | undefined {
        return this.item ? this.domSanitizer.bypassSecurityTrustUrl(this.item.photoUrl) : undefined;
    }
}
