import {Component, Input, EventEmitter, Output} from "@angular/core";
import {SimpleUser} from "@my-account/data/SimpleUser";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MyErrorStateMatcher} from "@shared/MyErrorStateMatcher";
import {SetEthereumAddressRequest} from "@my-account/data/SetEthereumAddressRequest";

/**
 * Length of Ethereum address.
 */
export const ETHEREUM_ADDRESS_LENGTH = 42;

/**
 * Labels and messages used in the component.
 */
export const STRINGS = {
    labels: {
        yourEthereumAddress: "Your Ethereum address",
        save: "Save"
    },
    errors: {
        required: "Address is required",
        tooShort: "Address is too short. Ethereum address must be 42 characters long.",
        tooLong: "Address is too long. Ethereum address must be 42 characters long."
    }
};

@Component({
    selector: "app-ethereum-address",
    templateUrl: "./ethereum-address.component.html",
    styleUrls: ["./ethereum-address.component.scss"]
})
export class EthereumAddressComponent {

    readonly strings = STRINGS;

    readonly controls = {
        ethereumAddress: new FormControl("", [
            Validators.required,
            Validators.minLength(ETHEREUM_ADDRESS_LENGTH),
            Validators.maxLength(ETHEREUM_ADDRESS_LENGTH)
        ])
    };

    readonly form = new FormGroup(this.controls);

    get errors() {
        return {
            ethereumAddress: {
                required: this.controls.ethereumAddress.hasError("required"),
                tooShort: !this.controls.ethereumAddress.hasError("required")
                    && this.controls.ethereumAddress.hasError("minlength"),
                tooLong: !this.controls.ethereumAddress.hasError("required")
                    && this.controls.ethereumAddress.hasError("maxlength")
            },
            formIsInvalid: this.form.invalid
        };
    }

    readonly errorStateMatcher = new MyErrorStateMatcher();

    @Input() loggedInUser!: SimpleUser;
    @Input() accounts!: string[];

    @Output() setEthereumAddressRequest = new EventEmitter<SetEthereumAddressRequest>();

    constructor() {
    }

    userIsLoggedInWithDeclaredAccount(): boolean {
        if (this.accounts.length > 1) {
            console.warn("more than one account controlled");
        }

        return this.accounts.length > 0 && this.accounts[0] === this.loggedInUser.ethereumAddress;
    }

    get userHasEthereumAddress(): boolean {
        return this.loggedInUser.ethereumAddress !== undefined;
    }

    emitSetEthereumAddressRequest() {
        this.setEthereumAddressRequest.emit(this.request);
    }

    private get request(): SetEthereumAddressRequest {
        return {
            ethereumAddress: this.controls.ethereumAddress.value
        };
    }
}
