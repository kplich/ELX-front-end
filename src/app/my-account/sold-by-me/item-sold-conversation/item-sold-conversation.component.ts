import {Component, Input} from "@angular/core";
import {SimpleConversation} from "@my-account/data/SimpleConversation";
import {LoggedInUserService} from "@shared/logged-in-user/logged-in-user.service";

@Component({
    selector: "item-sold-conversation",
    templateUrl: "./item-sold-conversation.component.html",
    styleUrls: ["./item-sold-conversation.component.scss"]
})
export class ItemSoldConversationComponent {

    strings = {
        you: "You"
    };

    @Input() conversation!: SimpleConversation;

    constructor(private loggedInUserService: LoggedInUserService) {
    }

    get lastMessageFromViewer(): boolean {
        const loggedInUser = this.loggedInUserService.authenticatedUser;

        return loggedInUser !== null
            && this.conversation.lastMessage.sendingUser.id === loggedInUser.id;
    }
}
