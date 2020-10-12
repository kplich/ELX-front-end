import {Component} from "@angular/core";
import {ItemWantedToSell} from "../data/items/ItemWantedToSell";
import {AbstractUserItemListComponent} from "../AbstractItemList";

@Component({
    selector: "items-wanted-to-sell",
    templateUrl: "./items-wanted-to-sell.component.html",
    styleUrls: ["./items-wanted-to-sell.component.scss"]
})
export class ItemsWantedToSellComponent extends AbstractUserItemListComponent<ItemWantedToSell>{
}
