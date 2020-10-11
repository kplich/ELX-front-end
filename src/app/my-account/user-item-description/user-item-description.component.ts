import {Component, Input} from "@angular/core";
import {Item} from "@items/data/Item";
import {AbstractUserItem} from "@my-account/data/items/AbstractUserItem";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {LoggedInUserService} from "@shared/logged-in-user/logged-in-user.service";

@Component({
    selector: "user-item-description",
    templateUrl: "./user-item-description.component.html",
    styleUrls: ["./user-item-description.component.scss"]
})
export class UserItemDescriptionComponent {

    @Input() item!: AbstractUserItem;

    strings = {
        category: Item.CATEGORY_LABEL,
        itemClosed: Item.CLOSED_ON_LABEL,
        addedBy: Item.ADDED_BY,
        addedOn: Item.ADDED_ON_LABEL,
        you: "You"
    };

    constructor(
        private domSanitizer: DomSanitizer,
        private loggedInUserService: LoggedInUserService) {
    }

    get photoUrl(): SafeUrl | undefined {
        return this.item ? this.domSanitizer.bypassSecurityTrustUrl(this.item.photoUrl) : undefined;
    }

    get itemIsAddedByViewer(): boolean {
        const loggedInUser = this.loggedInUserService.authenticatedUser;

        if (loggedInUser) {
            return loggedInUser.id === this.item.addedBy.id;
        }
        else {
            return false;
        }
    }
}
