import {Component, Input, Output, EventEmitter} from "@angular/core";
import {Item} from "@items/data/Item";
import {SimpleUser} from "@my-account/data/SimpleUser";
import {Router} from "@angular/router";

export const STRINGS = {
    category: Item.CATEGORY_LABEL,
    buttons: {
        sendMessage: "Send message",
        sendOffer: "Send offer",
        acceptOffer: "Accept offer",
        closeOffer: "Close offer",
        editItem: "Edit item"
    },
    itemClosed: Item.CLOSED_ON_LABEL
};

@Component({
    selector: "item-header",
    templateUrl: "./item-header.component.html",
    styleUrls: ["./item-header.component.scss"]
})
export class ItemHeaderComponent {

    strings = STRINGS;

    @Input() item!: Item;
    @Input() loggedInUser!: SimpleUser | null;

    @Output() closeItem = new EventEmitter<number>();

    constructor(private router: Router) { }

    navigateToUpdatingItem() {
        this.router.navigateByUrl(`items/${this.item.id}/edit`).then(() => {
            });
    }

    goToConversation() {
        this.router.navigateByUrl(`items/${this.item.id}/conversation`).then(() => {
            });
    }

    emitCloseItem() {
        this.closeItem.emit(this.item.id);
    }

    get userIsLoggedIn(): boolean {
        return this.loggedInUser !== null;
    }

    get loggedInUserIsOwner(): boolean {
        return this.loggedInUser ? this.loggedInUser.equals(this.item.addedBy) : false;
    }

    get canBeClosed(): boolean {
        return this.loggedInUserIsOwner && !this.item?.isClosed;
    }
}
