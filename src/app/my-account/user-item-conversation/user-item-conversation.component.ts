import {Component, Input} from "@angular/core";
import {SimpleConversation} from "@my-account/data/SimpleConversation";
import {LoggedInUserService} from "@shared/logged-in-user/logged-in-user.service";

export const STRINGS = {
    you: "You",
    sentAnOffer: "sent an offer."
};

@Component({
    selector: "user-item-conversation",
    templateUrl: "./user-item-conversation.component.html",
    styleUrls: ["./user-item-conversation.component.scss"],
})
export class UserItemConversationComponent {

    strings = STRINGS;

    @Input() conversation!: SimpleConversation;

    constructor(private loggedInUserService: LoggedInUserService) {
    }

    get lastMessageIsFromViewer(): boolean {
        const loggedInUser = this.loggedInUserService.authenticatedUser;

        return loggedInUser !== null
            && this.conversation.lastMessage.sendingUser.id === loggedInUser.id;
    }

    get viewerIsInterestedUser(): boolean {
        const loggedInUser = this.loggedInUserService.authenticatedUser;

        return loggedInUser !== null
            && this.conversation.interestedUserId === loggedInUser?.id;
    }

    get lastMessageHasText(): boolean {
        if (this.conversation) {
            return this.conversation.lastMessage.textContent !== undefined
                && this.conversation.lastMessage.textContent.trim().length > 0;
        } else {
            return false;
        }
    }
}
