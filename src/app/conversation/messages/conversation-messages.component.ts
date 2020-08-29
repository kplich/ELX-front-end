import {Component, AfterViewChecked, Input, Output, EventEmitter, ViewChild, ElementRef} from "@angular/core";
import {Conversation} from "@conversation/data/Conversation";
import {LoggedInUserService} from "@shared/logged-in-user/logged-in-user.service";
import {NewMessageRequest} from "@conversation/message-form/conversation-message-form.component";

@Component({
    selector: "app-conversation-messages",
    templateUrl: "./conversation-messages.component.html",
    styleUrls: ["./conversation-messages.component.scss"]
})
export class ConversationMessagesComponent implements AfterViewChecked {

    @Input() conversation: Conversation | undefined;

    @Output() messageSent = new EventEmitter<NewMessageRequest>();

    @ViewChild("messagesContainer")
    private messagesContainer!: ElementRef;

    constructor(private loggedInUserService: LoggedInUserService) {
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

    ngAfterViewChecked(): void {
        this.scrollMessagesToBottom();
    }

    private scrollMessagesToBottom(): void {
        (this.messagesContainer.nativeElement as HTMLElement).scrollBy({
            top: (this.messagesContainer.nativeElement as HTMLElement).scrollHeight,
            behavior: "smooth"
        });
    }

}
