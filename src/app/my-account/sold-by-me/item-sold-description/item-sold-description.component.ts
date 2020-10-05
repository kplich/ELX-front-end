import {Component, Input, OnInit} from "@angular/core";
import {SafeUrl, DomSanitizer} from "@angular/platform-browser";
import {ItemSoldByMe} from "@my-account/data/ItemSoldByMe";
import {Router} from "@angular/router";
import {Item} from "@items/data/Item";

@Component({
    selector: "item-sold-description",
    templateUrl: "./item-sold-description.component.html",
    styleUrls: ["./item-sold-description.component.scss"]
})
export class ItemSoldDescriptionComponent implements OnInit {

    strings = {
        you: "You",
        category: Item.CATEGORY_LABEL,
        itemClosed: Item.CLOSED_ON_LABEL,
        addedBy: Item.ADDED_BY,
        addedOn: Item.ADDED_ON_LABEL
    };

    @Input() item: ItemSoldByMe | undefined;

    constructor(
        private domSanitizer: DomSanitizer,
        private router: Router) {}

    ngOnInit() {
    }

    get photoUrl(): SafeUrl | undefined {
        return this.item ? this.domSanitizer.bypassSecurityTrustUrl(this.item.photoUrl) : undefined;
    }

    navigateToItem() {
        this.router.navigateByUrl(`/items/${this.item?.id}`).then(() => {
        });
    }
}
