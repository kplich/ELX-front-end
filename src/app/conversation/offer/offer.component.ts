import { EventEmitter, Input, Output, Component} from "@angular/core";
import {Offer} from "@conversation/data/offer/Offer";
import {LoggedInUserService} from "@shared/logged-in-user/logged-in-user.service";
import {PlainAdvanceOffer} from "@conversation/data/offer/PlainAdvanceOffer";
import {OfferType} from "@conversation/data/OfferType";

export const STRINGS = {
    header: "New offer!",
    priceLabel: "price",
    advanceLabel: "advance",
    typeLabel: "offer type",
    types: {
        plainAdvance: OfferType.PLAIN_ADVANCE,
        doubleAdvance: OfferType.DOUBLE_ADVANCE
    },
    buttons: {
        cancelLabel: "Cancel",
        declineLabel: "Decline",
        acceptLabel: "Accept"
    },
    messages: {
        cancelled: "Offer has been cancelled.",
        declined: "Offer has been declined.",
        accepted: "Offer has been accepted!"
    }
};

@Component({ template: "" })
export abstract class OfferComponent<O extends Offer> {

    readonly strings = STRINGS;

    @Input() offer: O | undefined;
    @Input() senderId!: number | undefined;

    @Output() cancelled = new EventEmitter<number>();
    @Output() declined = new EventEmitter<number>();
    @Output() accepted = new EventEmitter<O>();

    protected constructor(protected loggedInUserService: LoggedInUserService) {
    }

    get loggedInIsSender(): boolean {
        return this.senderId !== undefined
            && this.loggedInUserService.authenticatedUser !== null
            && this.senderId === this.loggedInUserService.authenticatedUser.id;
    }

    get offerIsPlainAdvance(): boolean {
        if (this.offer) {
            return this.offer instanceof PlainAdvanceOffer;
        }
        else {
            return false;
        }
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
            this.accepted.emit(this.offer);
        }
        else {
            console.warn("offer is undefined!");
        }
    }
}
