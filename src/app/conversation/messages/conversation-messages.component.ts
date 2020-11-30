import {AfterContentChecked, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from "@angular/core";
import {Conversation} from "@conversation/data/Conversation";
import {LoggedInUserService} from "@shared/logged-in-user/logged-in-user.service";
import {NewMessageRequest} from "@conversation/data/NewMessageRequest";
import {Offer} from "@conversation/data/offer/Offer";
import {SnackBarService} from "@shared/snack-bar-service/snack-bar.service";

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
export class ConversationMessagesComponent implements AfterContentChecked {

    @Input() conversation: Conversation | undefined;

    @Output() messageSent = new EventEmitter<NewMessageRequest>();
    @Output() offerCancelled = new EventEmitter<number>();
    @Output() offerDeclined = new EventEmitter<number>();
    @Output() offerAccepted = new EventEmitter<AcceptedOfferData>();

    @ViewChild("messagesContainer")
    private messagesContainer!: ElementRef<HTMLElement>;

    constructor(private loggedInUserService: LoggedInUserService,
                private snackBarService: SnackBarService) {
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

    ngAfterContentChecked(): void {
        this.scrollMessagesToBottom();
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
            } else {
                this.snackBarService.openSnackBar("Either you or the sender does not have an Ethereum address.");
            }
        } else {
            console.warn("conversation is undefined!");
        }

    }

    private scrollMessagesToBottom(): void {
        if (this.messagesContainer) {
            this.messagesContainer.nativeElement.scrollBy({
                top: (this.messagesContainer.nativeElement as HTMLElement).scrollHeight,
                behavior: "smooth"
            });
        } else {
            // HACK: if the container is not defined, simply wait for it
            setTimeout(() => this.scrollMessagesToBottom(), 500);
        }
    }
}
