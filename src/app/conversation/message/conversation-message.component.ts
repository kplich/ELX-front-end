import {Component, Input, Output, EventEmitter} from "@angular/core";
import {Message} from "@conversation/data/Message";
import {Offer} from "@conversation/data/Offer";

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
}
