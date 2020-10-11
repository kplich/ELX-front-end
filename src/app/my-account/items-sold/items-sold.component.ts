import {Component} from "@angular/core";
import {ItemSold} from "../data/items/ItemSold";
import {AbstractUserItemListComponent} from "../AbstractItemList";

@Component({
    selector: "items-sold",
    templateUrl: "./items-sold.component.html",
    styleUrls: ["./items-sold.component.scss"]
})
export class ItemsSoldComponent extends AbstractUserItemListComponent<ItemSold> {
}
