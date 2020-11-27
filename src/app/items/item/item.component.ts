import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {ItemsService} from "@items/service/items.service";
import {Item} from "@items/data/Item";
import {SnackBarService} from "@shared/snack-bar-service/snack-bar.service";
import {LoggedInUserService} from "@shared/logged-in-user/logged-in-user.service";
import {Observable} from "rxjs";
import {SimpleUser} from "@my-account/data/SimpleUser";

/**
 * Labels and messages used in this component.
 */
export const STRINGS = {
    category: Item.CATEGORY_LABEL,
    buttons: {
        sendMessage: "Send message",
        sendOffer: "Send offer",
        acceptOffer: "Accept offer",
        closeOffer: "Close offer",
        editItem: "Edit item"
    },
    itemClosed: Item.CLOSED_ON_LABEL,
    addedBy: Item.ADDED_BY,
    addedOn: Item.ADDED_ON_LABEL,
    messages: {
        couldNotLoadItem: "The item could not be loaded. Try again.",
        couldNotCloseItem: "An error occured while closing the item, try again later.",
        closedItem: "Item closed!"
    }
};

@Component({
    selector: "item-single",
    templateUrl: "./item.component.html",
    styleUrls: ["./item.component.scss"]
})
export class ItemComponent implements OnInit {

    strings = STRINGS;

    item$: Observable<Item> | undefined;

    constructor(
        private activatedRoute: ActivatedRoute,
        private itemsService: ItemsService,
        private snackBarService: SnackBarService,
        private loggedInUserService: LoggedInUserService,
    ) {
    }

    get loggedInUser(): SimpleUser | null {
        return this.loggedInUserService.authenticatedUser;
    }

    ngOnInit(): void {
        const itemIdString = this.activatedRoute.snapshot.paramMap.get("id");

        if (itemIdString !== null) {
            const id = parseInt(itemIdString, 10);
            this.item$ = this.itemsService.getItem(id);
        }
    }

    closeOffer(itemId: number) {
        this.item$ = this.itemsService.closeItem(itemId);
    }
}
