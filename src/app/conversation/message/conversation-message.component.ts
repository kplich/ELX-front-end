import {Component, Input} from '@angular/core';
import {Message} from '@conversation/data/Message';

@Component({
    selector: 'app-conversation-message',
    templateUrl: './conversation-message.component.html',
    styleUrls: ['./conversation-message.component.scss']
})
export class ConversationMessageComponent {

    @Input() message: Message | undefined;

    constructor() {
    }
}
