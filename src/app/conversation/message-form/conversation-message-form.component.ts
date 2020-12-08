import {Component, Output, EventEmitter, Input} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {MyErrorStateMatcher} from "@shared/MyErrorStateMatcher";
import {DialogService} from "@shared/dialog-service/dialog.service";
import {OfferFormComponent} from "@conversation/offer-form/offer-form.component";
import {NewMessageRequest} from "@conversation/data/NewMessageRequest";
import {NewOfferRequest} from "@conversation/data/NewOfferRequest";

export const STRINGS = {
    message: {
        label: "Your message",
        required: "Message is required if you're not sending an offer."
    }
};

@Component({
    selector: "app-conversation-message-form",
    templateUrl: "./conversation-message-form.component.html",
    styleUrls: ["./conversation-message-form.component.scss"]
})
export class ConversationMessageFormComponent {

    readonly strings = STRINGS;

    offer: NewOfferRequest | null = null;

    @Input() disableEditingOffers: boolean | undefined = false;

    @Output() messageSent = new EventEmitter<NewMessageRequest>();

    readonly errorStateMatcher = new MyErrorStateMatcher();

    readonly controls = {
        message: new FormControl("", Validators.required)
    };

    readonly form = new FormGroup(this.controls);

    get errors() {
        return {
            message: {
                notProvided: this.controls.message.hasError("required")
            },
            formIsInvalid: !this.form.valid
        };
    }

    get offerAdded(): boolean {
        return this.offer !== null;
    }

    get formCannotBeSent(): boolean {
        return this.offerAdded ? false : !this.form.valid;
    }

    constructor(private dialogService: DialogService) {
    }

    emitMessageRequest(): void {
        this.messageSent.emit({
            content: this.controls.message.value,
            offer: this.offer ? this.offer : undefined
        });

        this.form.reset();
        this.offer = null;
    }

    openOfferForm() {
        this.dialogService.openDialogForData<NewOfferRequest | null | undefined>(OfferFormComponent, this.offer)
            .subscribe((offer: NewOfferRequest | null | undefined) => {
                console.log(offer);
                if (offer !== undefined) {
                    this.offer = offer;
                }
            });
    }
}
