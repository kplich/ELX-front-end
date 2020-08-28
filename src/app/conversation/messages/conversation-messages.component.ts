import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import {Conversation} from "@conversation/data/Conversation";
import {LoggedInUserService} from "@shared/logged-in-user/logged-in-user.service";
import {NewMessageRequest} from "@conversation/message-form/conversation-message-form.component";

@Component({
    selector: "app-conversation-messages",
    templateUrl: "./conversation-messages.component.html",
    styleUrls: ["./conversation-messages.component.scss"]
})
export class ConversationMessagesComponent implements OnInit {

    @Input() conversation: Conversation | undefined;

    @Output() messageSent = new EventEmitter<NewMessageRequest>();

    constructor(private loggedInUserService: LoggedInUserService) {
    }

    ngOnInit(): void {
    }

    get loggedInUserId(): number | null {
        const user = this.loggedInUserService.authenticatedUser;

        if (user !== null) {
            return user.id;
        } else {
            return null;
        }
    }

    emitMessage(message: NewMessageRequest) {
        this.messageSent.emit(message);
    }
}
