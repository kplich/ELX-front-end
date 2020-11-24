import {Component} from "@angular/core";
import {ItemWantedToBuy} from "@my-account/data/items/ItemWantedToBuy";
import {AbstractUserItemListComponent} from "@my-account/abstract-user-item-list/abstract-user-item-list.component";

/**
 * Labels used in this component.
 */
export const STRINGS = {
    noItemsWantedToBuy: "You don't want to buy any item yet.",
    browseSome: "Try looking for some!"
};

@Component({
    selector: "items-wanted-to-buy",
    templateUrl: "./items-wanted-to-buy.component.html",
    styleUrls: ["./../abstract-user-item-list/abstract-user-item-list.component.scss"]
})
export class ItemsWantedToBuyComponent extends AbstractUserItemListComponent<ItemWantedToBuy> {
    strings = STRINGS;
}
