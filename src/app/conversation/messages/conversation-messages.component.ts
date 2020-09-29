import {Component, AfterViewChecked, Input, Output, EventEmitter, ViewChild, ElementRef} from "@angular/core";
import {Conversation} from "@conversation/data/Conversation";
import {LoggedInUserService} from "@shared/logged-in-user/logged-in-user.service";
import {NewMessageRequest} from "@conversation/data/NewMessageRequest";
import {Offer} from "@conversation/data/Offer";

export interface AcceptedOfferData {
    offer: Offer;
    sellerAddress: string;
    buyerAddress: string;
}

@Component({
    selector: "app-conversation-messages",
    templateUrl: "./conversation-messages.component.html",
    styleUrls: ["./conversation-messages.component.scss"]
})
export class ConversationMessagesComponent implements AfterViewChecked {

    @Input() conversation: Conversation | undefined;

    @Output() messageSent = new EventEmitter<NewMessageRequest>();
    @Output() offerCancelled = new EventEmitter<number>();
    @Output() offerDeclined = new EventEmitter<number>();
    @Output() offerAccepted = new EventEmitter<AcceptedOfferData>();

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
        if (this.messagesContainer) {
            (this.messagesContainer.nativeElement as HTMLElement).scrollBy({
                top: (this.messagesContainer.nativeElement as HTMLElement).scrollHeight,
                behavior: "smooth"
            });
        }
        else {
            console.warn("messages container is not defined");
        }
    }

    emitOfferCancelled(offerId: number) {
        this.offerCancelled.emit(offerId);
    }

    emitOfferDeclined(offerId: number) {
        this.offerDeclined.emit(offerId);
    }

    emitOfferAccepted(offer: Offer) {
        if (this.conversation) {
            if (this.conversation.interestedUser.ethereumAddress && this.conversation.item.addedBy.ethereumAddress) {
                this.offerAccepted.emit({
                    offer,
                    sellerAddress: this.conversation.item.addedBy.ethereumAddress,
                    buyerAddress: this.conversation.interestedUser.ethereumAddress
                });
            }
            else {
                // TODO: let the user know
                console.warn("users need to have ethereum addresses!");
            }
        }
        else {
            console.warn("conversation is undefined!");
        }

    }
}
