import {Component} from "@angular/core";
import {ItemSold} from "@my-account/data/items/ItemSold";
import {AbstractUserItemListComponent} from "@my-account/abstract-user-item-list/abstract-user-item-list.component";

export const STRINGS = {
    noItemsForSale: "You haven't sold any items yet.",
    addItem: "You might if you add one."
};

@Component({
    selector: "items-sold",
    templateUrl: "./items-sold.component.html",
    styleUrls: ["./../abstract-user-item-list/abstract-user-item-list.component.scss"]
})
export class ItemsSoldComponent extends AbstractUserItemListComponent<ItemSold> {
    strings = STRINGS;
}
