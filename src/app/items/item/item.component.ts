import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ItemsService} from "@items/service/items.service";
import {Item} from "@items/data/Item";
import {SnackBarService} from "@shared/snack-bar-service/snack-bar.service";
import {LoggedInUserService} from "@shared/logged-in-user/logged-in-user.service";
import {Observable, of} from "rxjs";
import {SimpleUser} from "@my-account/data/SimpleUser";
import {catchError} from "rxjs/operators";
import {UsedStatusDto} from "@items/data/UsedStatus";

export const ITEM_NOT_FOUND = new Item({
    id: 0,
    title: "Item not found!",
    description: "You must have got something wrong.",
    price: 0,
    addedBy: {
        id: 0,
        ethereumAddress: null,
        username: "notauser"
    },
    addedOn: Date.now().toLocaleString(),
    category: {
        id: 0,
        name: "Not a category"
    },
    usedStatus: UsedStatusDto.NOT_APPLICABLE,
    photoUrls: ["https://http.cat/404"],
    closedOn: null
});

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
        itemNotFound: "The item was not found.",
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

    item$!: Observable<Item>;

    constructor(
        private loggedInUserService: LoggedInUserService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private snackBarService: SnackBarService,
        private itemsService: ItemsService,
    ) {
    }

    get loggedInUser(): SimpleUser | null {
        return this.loggedInUserService.authenticatedUser;
    }

    ngOnInit(): void {
        const itemIdString = this.activatedRoute.snapshot.paramMap.get("id");

        if (itemIdString === null) {
            this.router.navigateByUrl("/error").then(() => {
                this.snackBarService.openSnackBar(STRINGS.messages.couldNotLoadItem);
            });
            return;
        }

        const id = parseInt(itemIdString, 10);
        if (isNaN(id)) {
            this.router.navigateByUrl("/error").then(() => {
                this.snackBarService.openSnackBar(STRINGS.messages.couldNotLoadItem);
            });
            return;
        }

        this.item$ = this.getItem(id);
    }

    closeItem(itemId: number) {
        const tempItem = this.item$;

        this.item$ = this.itemsService.closeItem(itemId).pipe(
            catchError(_ => {
                this.snackBarService.openSnackBar(STRINGS.messages.couldNotCloseItem);
                return tempItem;
            })
        );
    }

    private getItem(id: number): Observable<Item> {
        return this.itemsService.getItem(id).pipe(
            catchError((error) => {
                if (error.status === 404) {
                    this.router.navigateByUrl("/not-found").then(() => {
                        this.snackBarService.openSnackBar(STRINGS.messages.itemNotFound);
                    });
                } else {
                    this.router.navigateByUrl("/error").then(() => {
                        this.snackBarService.openSnackBar(STRINGS.messages.couldNotLoadItem);
                    });
                }

                return of(ITEM_NOT_FOUND);
            })
        );
    }
}
