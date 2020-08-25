import {Component, OnInit, Input} from '@angular/core';
import {Message} from "../../../conversation-service/data/Message";

@Component({
    selector: 'app-conversation-message',
    templateUrl: './conversation-message.component.html',
    styleUrls: ['./conversation-message.component.scss']
})
export class ConversationMessageComponent implements OnInit {

    @Input() message: Message;

    constructor() {
    }

    ngOnInit(): void {
    }

}
