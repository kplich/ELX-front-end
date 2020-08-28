import {Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MyErrorStateMatcher} from "../../../../shared/MyErrorStateMatcher";

export const MESSAGE_LABEL = 'Your message'
export const MESSAGE_REQUIRED_MESSAGE = 'Message is required if you\'re not sending an offer.';

@Component({
    selector: 'app-conversation-message-input',
    templateUrl: './conversation-message-input.component.html',
    styleUrls: ['./conversation-message-input.component.scss']
})
export class ConversationMessageInputComponent implements OnInit {

    readonly strings = {
        message: {
            label: MESSAGE_LABEL,
            required: MESSAGE_REQUIRED_MESSAGE
        }
    }

    readonly errorStateMatcher = new MyErrorStateMatcher();

    readonly controls = {
        message: new FormControl('', Validators.required)
    };

    readonly form = new FormGroup(this.controls);

    get errors() {
        return {
            message: {
                notProvided: this.controls.message.hasError('required')
            }
        }
    }

    constructor() {
    }

    ngOnInit(): void {
    }

}
