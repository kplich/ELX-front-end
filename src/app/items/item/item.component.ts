import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ItemsService} from "@items/service/items.service";
import {Item} from "@items/data/Item";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {SnackBarService} from "@shared/snack-bar-service/snack-bar.service";
import {LoggedInUserService} from "@shared/logged-in-user/logged-in-user.service";
import { HttpResponse, HttpErrorResponse } from "@angular/common/http";

export const BUTTON_SEND_MESSAGE_TEXT = "Send message";
export const BUTTON_SEND_OFFER_TEXT = "Send offer";
export const BUTTON_ACCEPT_OFFER_TEXT = "Accept offer";
export const BUTTON_CLOSE_OFFER_TEXT = "Close offer";
export const BUTTON_EDIT_ITEM_TEXT = "Edit item";

export const COULD_NOT_LOAD_ITEM_MESSAGE = "The item could not be loaded. Try again.";
export const COULD_NOT_CLOSE_ITEM_MESSAGE = "An error occured while closing the item, try again later.";
export const ITEM_CLOSED_MESSAGE = "Item closed!";

@Component({
    selector: "item-single",
    templateUrl: "./item.component.html",
    styleUrls: ["./item.component.scss"]
})
export class ItemComponent implements OnInit {

    strings = {
        category: Item.CATEGORY_LABEL,
        buttons: {
            sendMessage: BUTTON_SEND_MESSAGE_TEXT,
            sendOffer: BUTTON_SEND_OFFER_TEXT,
            acceptOffer: BUTTON_ACCEPT_OFFER_TEXT,
            closeOffer: BUTTON_CLOSE_OFFER_TEXT,
            editItem: BUTTON_EDIT_ITEM_TEXT
        },
        itemClosed: Item.CLOSED_ON_LABEL,
        addedBy: Item.ADDED_BY,
        addedOn: Item.ADDED_ON_LABEL
    };

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
                    this.snackBarService.openSnackBar(COULD_NOT_LOAD_ITEM_MESSAGE);
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
                    this.snackBarService.openSnackBar(ITEM_CLOSED_MESSAGE);
                },
                error: () => {
                    this.snackBarService.openSnackBar(COULD_NOT_CLOSE_ITEM_MESSAGE);
                }
            });
        } else {
            this.snackBarService.openSnackBar(COULD_NOT_CLOSE_ITEM_MESSAGE);
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
