import {Component} from "@angular/core";
import {ItemWantedToSell} from "@my-account/data/items/ItemWantedToSell";
import {AbstractUserItemListComponent} from "@my-account/abstract-user-item-list/abstract-user-item-list.component";

export const STRINGS = {
    noItemsForSale: "You don't have any items for sale.",
    addItem: "Add one now!"
};

@Component({
    selector: "items-wanted-to-sell",
    templateUrl: "./items-wanted-to-sell.component.html",
    styleUrls: ["./../abstract-user-item-list/abstract-user-item-list.component.scss"]
})
export class ItemsWantedToSellComponent extends AbstractUserItemListComponent<ItemWantedToSell> {
    readonly strings = STRINGS;
}
