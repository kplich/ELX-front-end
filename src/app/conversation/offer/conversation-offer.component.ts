import {Component, Input, Output, EventEmitter} from "@angular/core";
import {Offer} from "@conversation/data/Offer";
import {LoggedInUserService} from "@shared/logged-in-user/logged-in-user.service";

export const STRINGS = {
    header: "New offer!",
    priceLabel: "price",
    advanceLabel: "label",
    typeLabel: "offer type",
    buttons: {
        cancelLabel: "Cancel",
        declineLabel: "Decline",
        acceptLabel: "Accept"
    },
    notices: {
        cancelled: "Offer has been cancelled by sender.",
        declined: "You declined the offer.",
        accepted: "You accepted the offer!"
    }
};

@Component({
    selector: "app-conversation-offer",
    templateUrl: "./conversation-offer.component.html",
    styleUrls: ["./conversation-offer.component.scss"]
})
export class ConversationOfferComponent {

    readonly strings = STRINGS;

    @Input() offer: Offer | undefined;
    @Input() senderId!: number | undefined;

    @Output() cancelled = new EventEmitter<number>();
    @Output() declined = new EventEmitter<number>();
    @Output() accepted = new EventEmitter<number>();

    constructor(private loggedInUserService: LoggedInUserService) {
    }

    get loggedInIsSender(): boolean {
        return this.senderId !== undefined
            && this.loggedInUserService.authenticatedUser !== null
            && this.senderId === this.loggedInUserService.authenticatedUser.id;
    }

    emitCancelled() {
        if (this.offer) {
            this.cancelled.emit(this.offer.id);
        }
        else {
            console.warn("offer is undefined!");
        }
    }

    emitDeclined() {
        if (this.offer) {
            this.declined.emit(this.offer.id);
        }
        else {
            console.warn("offer is undefined!");
        }
    }

    emitAccepted() {
        // TODO: contract address is also needed here!
        if (this.offer) {
            this.accepted.emit(this.offer.id);
        }
        else {
            console.warn("offer is undefined!");
        }
    }
}
