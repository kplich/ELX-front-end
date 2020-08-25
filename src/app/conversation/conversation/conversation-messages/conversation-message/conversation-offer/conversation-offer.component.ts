import {Component, OnInit, Input} from '@angular/core';
import {Offer} from "../../../../conversation-service/data/Offer";
import {LoggedInUserService} from "../../../../../shared/logged-in-user/logged-in-user.service";

@Component({
    selector: 'app-conversation-offer',
    templateUrl: './conversation-offer.component.html',
    styleUrls: ['./conversation-offer.component.scss']
})
export class ConversationOfferComponent implements OnInit {

    @Input() offer!: Offer;
    @Input() senderId!: number;

    constructor(private loggedInUserService: LoggedInUserService) {
    }

    ngOnInit(): void {
    }

    get loggedInIsSender(): boolean {
        return this.loggedInUserService.authenticatedUser !== null
            && this.senderId === this.loggedInUserService.authenticatedUser.id
    }
}
