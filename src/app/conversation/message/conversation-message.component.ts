import {Component, Input, Output, EventEmitter} from "@angular/core";
import {Message} from "@conversation/data/Message";
import {Offer} from "@conversation/data/offer/Offer";
import {PlainAdvanceOffer} from "@conversation/data/offer/PlainAdvanceOffer";
import {DoubleAdvanceOffer} from "@conversation/data/offer/DoubleAdvanceOffer";

@Component({
    selector: "app-conversation-message",
    templateUrl: "./conversation-message.component.html",
    styleUrls: ["./conversation-message.component.scss"]
})
export class ConversationMessageComponent {

    @Input() message: Message | undefined;

    @Output() offerCancelled = new EventEmitter<number>();
    @Output() offerDeclined = new EventEmitter<number>();
    @Output() offerAccepted = new EventEmitter<Offer>();

    constructor() {
    }

    emitCancelled(offerId: number) {
        this.offerCancelled.emit(offerId);
    }

    emitDeclined(offerId: number) {
        this.offerDeclined.emit(offerId);
    }

    emitAccepted(offer: Offer) {
        this.offerAccepted.emit(offer);
    }

    get offerIsPlainAdvance(): boolean {
        if (this.message?.offer) {
            return this.message.offer instanceof PlainAdvanceOffer;
        }
        else {
            return false;
        }
    }

    get offerIsDoubleAdvance(): boolean {
        if (this.message?.offer) {
            return this.message.offer instanceof DoubleAdvanceOffer;
        }
        else {
            return false;
        }
    }
}
