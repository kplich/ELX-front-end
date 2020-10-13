import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";
import {AuthenticationService} from "@authentication/authentication-service/authentication.service";
import {SnackBarService} from "@shared/snack-bar-service/snack-bar.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {MyErrorStateMatcher} from "@shared/MyErrorStateMatcher";
import {LOGGED_IN_SUCCESSFULLY_MESSAGE} from "@authentication/logging-in/logging-in.component";
import {LoggedInUserService} from "@shared/logged-in-user/logged-in-user.service";
import {RegistrationRequest} from "@authentication/data/RegistrationRequest";

export const MINIMUM_USERNAME_LENGTH = 3;
export const MAXIMUM_USERNAME_LENGTH = 20;

export const MINIMUM_PASSWORD_LENGTH = 8;
export const MAXIMUM_PASSWORD_LENGTH = 40;

export const ETHEREUM_ADDRESS_LENGTH = 42;

export const INVALID_DATA_MESSAGE = "Invalid request data!";
export const SERVER_ERROR_MESSAGE = "Server error, try again!";
export const SIGNED_UP_SUCCESSFULLY_MESSAGE = "Signed up successfully!";

export const STRINGS = {
    username: {
        label: "Username",
        hint: `Username has to be ${MINIMUM_USERNAME_LENGTH}-${MAXIMUM_USERNAME_LENGTH} characters long and can only contain letters, digits and underscores (_).`,
        required: "A username is required!",
        tooShort: `The username needs to be at least ${MINIMUM_USERNAME_LENGTH} characters long.`,
        tooLong: `The username needs to be at most ${MAXIMUM_USERNAME_LENGTH} characters long.`,
        doesntMatchPattern: "Username can only contain letters, digits and underscores (_)."
    },
    password: {
        label: "Password",
        hint: `Password has to be ${MINIMUM_PASSWORD_LENGTH}-${MAXIMUM_PASSWORD_LENGTH} characters long (including a lowercase letter, an uppercase letter, a digit and a special character.)`,
        required: "A password is required!",
        tooShort: `The password needs to be at least ${MINIMUM_PASSWORD_LENGTH} characters long.`,
        tooLong: `The password needs to be at most ${MAXIMUM_PASSWORD_LENGTH} characters long.`,
        doesntMatchPattern: "The password needs to have a lowercase and an uppercase letter, a digit and a special character."
    },
    ethereumAddress: {
        label: "Ethereum address",
        hint: "Address of your Ethereum account - 42 characters, beginning with 0x. You don't need to provide it now, but you won't be able to send offers without it.",
        tooShortOrTooLong: "The Ethereum address needs to be exactly 42 characters long."
    },
    button: {
        register: "Register"
    }
};

@Component({
    selector: "identity-registration",
    templateUrl: "./registration.component.html",
    styleUrls: ["./registration.component.scss"]
})
export class RegistrationComponent implements OnInit {

    readonly strings = STRINGS;

    // language=JSRegexp
    readonly lettersDigitsUnderscoresPattern = "\\w*";
    // language=JSRegexp
    readonly containsUppercaseLetterPattern = ".*[A-Z]+.*";
    // language=JSRegexp
    readonly containsLowercaseLetterPattern = ".*[a-z]+.*";
    // language=JSRegexp
    readonly containsDigitPattern = ".*\\d+.*";
    // language=JSRegexp
    readonly containsSpecialCharacterPattern = ".*[\\W_]+.*";

    readonly controls = Object.freeze({
        username: new FormControl("", [
            Validators.required,
            Validators.minLength(MINIMUM_USERNAME_LENGTH),
            Validators.maxLength(MAXIMUM_USERNAME_LENGTH),
            Validators.pattern(this.lettersDigitsUnderscoresPattern)
        ]),
        password: new FormControl("", [
            Validators.required,
            Validators.pattern(this.containsLowercaseLetterPattern),
            Validators.pattern(this.containsUppercaseLetterPattern),
            Validators.pattern(this.containsDigitPattern),
            Validators.pattern(this.containsSpecialCharacterPattern),
            Validators.minLength(MINIMUM_PASSWORD_LENGTH),
            Validators.maxLength(MAXIMUM_PASSWORD_LENGTH)
        ]),
        ethereumAddress: new FormControl("", [
            Validators.minLength(ETHEREUM_ADDRESS_LENGTH),
            Validators.maxLength(ETHEREUM_ADDRESS_LENGTH)
        ])
    });

    readonly errorStateMatcher: ErrorStateMatcher = new MyErrorStateMatcher();
    readonly form: FormGroup = new FormGroup(this.controls);

    constructor(
        private loggedInUserService: LoggedInUserService,
        private authenticationService: AuthenticationService,
        private router: Router,
        private snackBarService: SnackBarService
    ) {
    }

    get errors() {
        return {
            username: {
                notProvided: () => this.controls.username.hasError("required"),
                tooShort: () => this.controls.username.hasError("minlength"),
                tooLong: () => this.controls.username.hasError("maxlength"),
                doesntMatchPattern: () => !this.errors.username.tooLong()
                    && !this.errors.username.tooShort()
                    && this.controls.username.hasError("pattern")
            },
            password: {
                notProvided: () => this.controls.password.hasError("required"),
                tooShort: () => this.controls.password.hasError("minlength"),
                tooLong: () => this.controls.password.hasError("maxlength"),
                doesntMatchPattern: () => !this.errors.password.tooShort()
                    && !this.errors.password.tooLong()
                    && this.controls.password.hasError("pattern")
            },
            ethereumAddress: {
                tooShortOrTooLong: this.controls.ethereumAddress.hasError("minlength")
                    || this.controls.ethereumAddress.hasError("maxlength")
            }
        };
    }

    get neitherTouchedNorDirty() {
        return {
            username: !this.controls.username.dirty && !this.controls.username.touched,
            password: !this.controls.password.dirty && !this.controls.password.touched,
            ethereumAddress: !this.controls.ethereumAddress.dirty && !this.controls.ethereumAddress.touched
        };
    }

    private get registrationRequest(): RegistrationRequest {
        return {
            username: this.controls.username.value,
            password: this.controls.password.value,
            ethereumAddress:
                this.controls.ethereumAddress.value === "" ? undefined : this.controls.ethereumAddress.value
        };
    }

    ngOnInit(): void {
        if (this.loggedInUserService.authenticatedUser !== null) {
            this.router.navigateByUrl("/items").then(() => {
                if (this.loggedInUserService.authenticatedUser !== null) {
                    this.snackBarService.openSnackBar(
                        LOGGED_IN_SUCCESSFULLY_MESSAGE(this.loggedInUserService.authenticatedUser.username)
                    );
                }
            });
        }
    }

    register() {
        this.authenticationService.signUp(this.registrationRequest).subscribe({
            next: () => {
                this.router.navigateByUrl("/log-in").then(() => {
                    this.snackBarService.openSnackBar(SIGNED_UP_SUCCESSFULLY_MESSAGE);
                });
            },
            error: error => this.openSnackBarOnError(error)
        });
    }

    private openSnackBarOnError(errorResponse: HttpErrorResponse) {
        switch (errorResponse.status) {
            case 400: {
                this.snackBarService.openSnackBar(errorResponse.error.userMessage);
                break;
            }
            case 409: {
                this.snackBarService.openSnackBar(errorResponse.error.message);
                break;
            }
            case 500: {
                this.snackBarService.openSnackBar(SERVER_ERROR_MESSAGE);
                break;
            }
        }
    }
}
