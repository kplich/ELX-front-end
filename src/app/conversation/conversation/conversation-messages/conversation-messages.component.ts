import {Component, OnInit, Input} from '@angular/core';
import { Conversation } from '../../conversation-service/data/Conversation';

@Component({
    selector: 'app-conversation-messages',
    templateUrl: './conversation-messages.component.html',
    styleUrls: ['./conversation-messages.component.scss']
})
export class ConversationMessagesComponent implements OnInit {

    @Input() conversation: Conversation | undefined;

    constructor() {
    }

    ngOnInit(): void {
    }
}
