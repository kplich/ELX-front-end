import {Component, Input, Output, EventEmitter} from "@angular/core";
import {Offer} from "@conversation/data/Offer";
import {LoggedInUserService} from "@shared/logged-in-user/logged-in-user.service";

export interface AcceptedOfferPrices {
    offerId: number;
    price: number;
    advance: number;
}

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
        cancelled: "Offer has been cancelled.",
        declined: "Offer has been declined.",
        accepted: "Offer has been accepted!"
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
    @Output() accepted = new EventEmitter<AcceptedOfferPrices>();

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
        if (this.offer) {
            this.accepted.emit({
                offerId: this.offer.id,
                price: this.offer.price,
                advance: this.offer.advance
            });
        }
        else {
            console.warn("offer is undefined!");
        }
    }
}
