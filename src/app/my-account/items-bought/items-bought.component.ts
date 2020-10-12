import {Component} from "@angular/core";
import {ItemBought} from "@my-account/data/items/ItemBought";
import {AbstractUserItemListComponent} from "@my-account/abstract-user-item-list/abstract-user-item-list.component";

export const STRINGS = {
    noItemsWantedToBuy: "You haven't bought any items yet.",
    browseSome: "Look for some that may interest you."
};

@Component({
    selector: "items-bought",
    templateUrl: "./items-bought.component.html",
    styleUrls: ["./../abstract-user-item-list/abstract-user-item-list.component.scss"]
})
export class ItemsBoughtComponent extends AbstractUserItemListComponent<ItemBought> {
    strings = STRINGS;
}
