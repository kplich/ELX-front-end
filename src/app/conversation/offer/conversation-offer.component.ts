import {Component, Input} from "@angular/core";
import {Offer} from "@conversation/data/Offer";
import {LoggedInUserService} from "@shared/logged-in-user/logged-in-user.service";

@Component({
    selector: "app-conversation-offer",
    templateUrl: "./conversation-offer.component.html",
    styleUrls: ["./conversation-offer.component.scss"]
})
export class ConversationOfferComponent {

    @Input() offer: Offer | undefined;
    @Input() senderId!: number | undefined;

    constructor(private loggedInUserService: LoggedInUserService) {
    }

    get loggedInIsSender(): boolean {
        return this.senderId !== undefined
            && this.loggedInUserService.authenticatedUser !== null
            && this.senderId === this.loggedInUserService.authenticatedUser.id;
    }
}
