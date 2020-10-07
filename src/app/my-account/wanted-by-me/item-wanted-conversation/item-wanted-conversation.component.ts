import {Component, Input} from "@angular/core";
import {SimpleConversation} from "@my-account/data/SimpleConversation";
import {LoggedInUserService} from "@shared/logged-in-user/logged-in-user.service";

@Component({
    selector: "item-wanted-conversation",
    templateUrl: "./item-wanted-conversation.component.html",
    styleUrls: ["./item-wanted-conversation.component.scss"]
})
export class ItemWantedConversationComponent {

    strings = {
        you: "You",
        sentAnOffer: "sent an offer."
    };

    @Input() conversation!: SimpleConversation;

    constructor(private loggedInUserService: LoggedInUserService) {
    }

    get lastMessageFromViewer(): boolean {
        const loggedInUser = this.loggedInUserService.authenticatedUser;

        return loggedInUser !== null
            && this.conversation.interestedUser.id === loggedInUser.id;
    }

    get lastMessageHasText(): boolean {
        if (this.conversation) {
            return this.conversation.lastMessage.textContent !== undefined
                && this.conversation.lastMessage.textContent.trim().length > 0;
        }
        else {
            return false;
        }
    }
}
