import { Component, Input } from "@angular/core";
import {Item} from "@items/data/Item";
import {ItemBoughtByMe} from "@my-account/data/ItemBoughtByMe";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";

@Component({
  selector: "app-item-bought-description",
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

    @Input() item: ItemBoughtByMe | undefined;

    constructor(private domSanitizer: DomSanitizer) {
    }

    get photoUrl(): SafeUrl | undefined {
        return this.item ? this.domSanitizer.bypassSecurityTrustUrl(this.item.photoUrl) : undefined;
    }

}
