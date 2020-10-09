import { Component, Input } from "@angular/core";
import {Item} from "@items/data/Item";
import {ItemBought} from "@my-account/data/ItemBought";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";

@Component({
  selector: "item-bought-description",
  templateUrl: "./item-bought-description.component.html",
  styleUrls: ["./item-bought-description.component.scss"]
})
export class ItemBoughtDescriptionComponent {

    strings = {
        category: Item.CATEGORY_LABEL,
        itemClosed: Item.CLOSED_ON_LABEL,
        addedBy: Item.ADDED_BY,
        addedOn: Item.ADDED_ON_LABEL
    };

    @Input() item: ItemBought | undefined;

    constructor(private domSanitizer: DomSanitizer) {
    }

    get photoUrl(): SafeUrl | undefined {
        return this.item ? this.domSanitizer.bypassSecurityTrustUrl(this.item.photoUrl) : undefined;
    }

}
