import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ItemsService} from '../items-service/items.service';
import {Item} from '../items-service/data/Item';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {SnackBarService} from '../../shared/snack-bar-service/snack-bar.service';
import {AuthenticationService} from '../../identity-management/authentication-service/authentication.service';

export const BUTTON_SEND_MESSAGE_TEXT = 'Send message';
export const BUTTON_SEND_OFFER_TEXT = 'Send offer';
export const BUTTON_ACCEPT_OFFER_TEXT = 'Accept offer';
export const BUTTON_CLOSE_OFFER_TEXT = 'Close offer';
export const BUTTON_EDIT_ITEM_TEXT = 'Edit item';

export const COULD_NOT_LOAD_ITEM_MESSAGE = 'The item could not be loaded. Try again.';
export const COULD_NOT_CLOSE_ITEM_MESSAGE = 'An error occured while closing the item, try again later.';
export const ITEM_CLOSED_MESSAGE = 'Item closed!';

@Component({
    selector: 'item-single',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss']
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

    item: Item;

    constructor(
        private activatedRoute: ActivatedRoute,
        private itemsService: ItemsService,
        private snackBarService: SnackBarService,
        private domSanitizer: DomSanitizer,
        private authenticationService: AuthenticationService,
        private router: Router
    ) {
    }

    get itemPhotoUrls(): SafeUrl[] {
        return this.item?.getSafePhotoUrls(this.domSanitizer);
    }

    get canBeClosed(): boolean {
        return this.addedByLoggedInUser && !this.item?.isClosed;
    }

    get addedByLoggedInUser(): boolean {
        const loggedInUser = this.authenticationService.authenticatedUser;

        if (loggedInUser === null) {
            return false;
        } else {
            return loggedInUser === this.item?.addedBy.username;
        }
    }

    ngOnInit(): void {
        const id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'), 10);
        this.itemsService.getItem(id).subscribe({
            next: response => {
                this.item = response.body;
            },
            error: error => {
                console.error(error);
                this.snackBarService.openSnackBar(COULD_NOT_LOAD_ITEM_MESSAGE);
            }
        });
    }

    closeOffer() {
        this.itemsService.closeItem(this.item.id).subscribe({
            next: response => {
                this.item = response.body;
                this.snackBarService.openSnackBar(ITEM_CLOSED_MESSAGE);
            },
            error: error => {
                this.snackBarService.openSnackBar(COULD_NOT_CLOSE_ITEM_MESSAGE);
            }
        });
    }

    navigateToUpdatingItem() {
        this.router.navigateByUrl(`items/${this.item.id}/edit`).then(() => {
        });
    }
}
