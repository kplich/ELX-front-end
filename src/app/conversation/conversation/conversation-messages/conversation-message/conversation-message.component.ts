import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'app-conversation-message',
    templateUrl: './conversation-message.component.html',
    styleUrls: ['./conversation-message.component.scss']
})
export class ConversationMessageComponent implements OnInit {

    @Input() message: string;

    constructor() {
    }

    ngOnInit(): void {
    }

}
