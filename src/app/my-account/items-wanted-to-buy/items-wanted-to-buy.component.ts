import {Component} from "@angular/core";
import {ItemWantedToBuy} from "../data/items/ItemWantedToBuy";
import {AbstractUserItemListComponent} from "../AbstractItemList";

@Component({
    selector: "items-wanted-to-buy",
    templateUrl: "./items-wanted-to-buy.component.html",
    styleUrls: ["./items-wanted-to-buy.component.scss"]
})
export class ItemsWantedToBuyComponent extends AbstractUserItemListComponent<ItemWantedToBuy> {

}
