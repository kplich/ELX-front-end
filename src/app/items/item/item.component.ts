import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ItemsService} from "@items/service/items.service";
import {Item} from "@items/data/Item";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {SnackBarService} from "@shared/snack-bar-service/snack-bar.service";
import {LoggedInUserService} from "@shared/logged-in-user/logged-in-user.service";
import { HttpResponse, HttpErrorResponse } from "@angular/common/http";

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

    item: Item | undefined;

    constructor(
        private activatedRoute: ActivatedRoute,
        private itemsService: ItemsService,
        private snackBarService: SnackBarService,
        private domSanitizer: DomSanitizer,
        private loggedInUserService: LoggedInUserService,
        private router: Router
    ) {}

    get itemPhotoUrls(): SafeUrl[] | undefined {
        return this.item?.getSafePhotoUrls(this.domSanitizer);
    }

    get userIsLoggedIn(): boolean {
        return this.loggedInUserService.authenticatedUser !== null;
    }

    get canBeClosed(): boolean {
        return this.loggedInUserIsOwner && !this.item?.isClosed;
    }

    get loggedInUserIsOwner(): boolean {
        const loggedInUser = this.loggedInUserService.authenticatedUser;

        if (loggedInUser === null) {
            return false;
        } else {
            return loggedInUser.username === this.item?.addedBy.username;
        }
    }

    ngOnInit(): void {
        const itemIdString = this.activatedRoute.snapshot.paramMap.get("id");

        if (itemIdString !== null) {
            const id = parseInt(itemIdString, 10);
            this.itemsService.getItem(id).subscribe({
                next: (response: HttpResponse<Item>) => {
                    if (response.body === null) { throw new Error("Empty response body"); }
                    this.item = response.body;
                },
                error: (error: HttpErrorResponse) => {
                    console.error(error);
                    this.snackBarService.openSnackBar(STRINGS.messages.couldNotLoadItem);
                }
            });
        }
    }

    closeOffer() {
        if (this.item) {
            this.itemsService.closeItem(this.item.id).subscribe({
                next: (response: HttpResponse<Item>) => {
                    if (response.body === null) { throw new Error("Empty response body"); }
                    this.item = response.body;
                    this.snackBarService.openSnackBar(STRINGS.messages.closedItem);
                },
                error: () => {
                    this.snackBarService.openSnackBar(STRINGS.messages.couldNotCloseItem);
                }
            });
        } else {
            this.snackBarService.openSnackBar(STRINGS.messages.couldNotCloseItem);
        }
    }

    navigateToUpdatingItem() {
        if (this.item) {
            this.router.navigateByUrl(`items/${this.item.id}/edit`).then(() => {
            });
        }
    }

    goToConversation() {
        if (this.item) {
            this.router.navigateByUrl(`items/${this.item.id}/conversation`).then(() => {
            });
        }
    }
}
