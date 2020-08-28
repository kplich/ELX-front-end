import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {OfferType} from '@conversation/data/OfferType';
import {MyErrorStateMatcher} from '@shared/MyErrorStateMatcher';

export const MESSAGE_LABEL = 'Your message';
export const MESSAGE_REQUIRED_MESSAGE = 'Message is required if you\'re not sending an offer.';

export interface NewOfferRequest {
    type: OfferType;
    price: number;
    advance: number;
}

export interface NewMessageRequest {
    message: string;
    offer?: NewOfferRequest;
}

@Component({
    selector: 'app-conversation-message-input',
    templateUrl: './conversation-message-form.component.html',
    styleUrls: ['./conversation-message-form.component.scss']
})
export class ConversationMessageFormComponent implements OnInit {

    readonly strings = {
        message: {
            label: MESSAGE_LABEL,
            required: MESSAGE_REQUIRED_MESSAGE
        }
    };

    @Output() messageSent = new EventEmitter<NewMessageRequest>();

    readonly errorStateMatcher = new MyErrorStateMatcher();

    readonly controls = {
        message: new FormControl('', Validators.required)
    };

    readonly form = new FormGroup(this.controls);

    get errors() {
        return {
            message: {
                notProvided: this.controls.message.hasError('required')
            },
            formIsInvalid: !this.form.valid
        };
    }

    constructor() {
    }

    ngOnInit(): void {
    }

    emitMessageRequest(): void {
        console.log('emitting!');
        this.messageSent.emit({
            message: this.controls.message.value
        });
    }
}
