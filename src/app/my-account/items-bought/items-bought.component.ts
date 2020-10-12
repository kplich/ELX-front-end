import {Component} from "@angular/core";
import {ItemBought} from "../data/items/ItemBought";
import {AbstractUserItemListComponent} from "../AbstractItemList";

@Component({
    selector: "items-bought",
    templateUrl: "./items-bought.component.html",
    styleUrls: ["./items-bought.component.scss"]
})
export class ItemsBoughtComponent extends AbstractUserItemListComponent<ItemBought> {
}
