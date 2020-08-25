import {Component, OnInit, Input} from '@angular/core';
import { Conversation } from '../../conversation-service/data/Conversation';
import {AuthenticationService} from "../../../identity-management/authentication-service/authentication.service";

@Component({
    selector: 'app-conversation-messages',
    templateUrl: './conversation-messages.component.html',
    styleUrls: ['./conversation-messages.component.scss']
})
export class ConversationMessagesComponent implements OnInit {

    @Input() conversation: Conversation | undefined;

    constructor(private authenticationService: AuthenticationService) {
    }

    ngOnInit(): void {
    }

    get loggedInUserId(): number | null {
        const user = this.authenticationService.authenticatedUser;

        if(user !== null) {
            return user.id;
        }
        else {
            return null;
        }
    }
}
