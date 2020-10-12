import {Component, OnInit} from "@angular/core";
import { Observable } from "rxjs";
import {UserService} from "@my-account/user-service/user.service";
import {ItemWantedToSell} from "@my-account/data/items/ItemWantedToSell";
import {ItemWantedToBuy} from "@my-account/data/items/ItemWantedToBuy";
import {ItemBought} from "@my-account/data/items/ItemBought";
import {ItemSold} from "@my-account/data/items/ItemSold";

@Component({
    selector: "my-account",
    templateUrl: "./my-account.component.html",
    styleUrls: ["./my-account.component.scss"]
})
export class MyAccountComponent implements OnInit {

    itemsWantedToSell$!: Observable<ItemWantedToSell[]>;
    itemsSold$!: Observable<ItemSold[]>;
    itemsWantedToBuy$!: Observable<ItemWantedToBuy[]>;
    itemsBought$!: Observable<ItemBought[]>;

    constructor(private userService: UserService) {
    }

    ngOnInit() {
        this.itemsWantedToSell$ = this.userService.getItemsWantedToSell();
        this.itemsSold$ = this.userService.getItemsSold();
        this.itemsWantedToBuy$ = this.userService.getItemsWantedToBuy();
        this.itemsBought$ = this.userService.getItemsBought();
    }
}
