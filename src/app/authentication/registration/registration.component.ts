import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";
import {AuthenticationService} from "../authentication-service/authentication.service";
import {Credentials} from "../data/Credentials";
import {SnackBarService} from "@shared/snack-bar-service/snack-bar.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {MyErrorStateMatcher} from "@shared/MyErrorStateMatcher";
import {LOGGED_IN_SUCCESSFULLY_MESSAGE} from "../logging-in/logging-in.component";
import {LoggedInUserService} from "@shared/logged-in-user/logged-in-user.service";

export const USERNAME_LABEL = "Username";
export const USERNAME_REQUIRED_MESSAGE = "A username is required!";
export const MINIMUM_USERNAME_LENGTH = 3;
export const MINIMUM_USERNAME_LENGTH_MESSAGE
    = `The username needs to be at least ${MINIMUM_USERNAME_LENGTH} characters long.`;
export const MAXIMUM_USERNAME_LENGTH = 20;
export const MAXIMUM_USERNAME_LENGTH_MESSAGE
    = `The username needs to be at most ${MAXIMUM_USERNAME_LENGTH} characters long.`;
export const USERNAME_PATTERN_MESSAGE = "Username can only contain letters, digits and underscores (_).";
export const USERNAME_HINT
    = `Username has to be ${MINIMUM_USERNAME_LENGTH}-${MAXIMUM_USERNAME_LENGTH} characters long and can only contain letters, digits and underscores (_).`;

export const PASSWORD_LABEL = "Password";
export const PASSWORD_REQUIRED_MESSAGE = "A password is required!";
export const MINIMUM_PASSWORD_LENGTH = 8;
export const MINIMUM_PASSWORD_LENGTH_MESSAGE
    = `The password needs to be at least ${MINIMUM_PASSWORD_LENGTH} characters long.`;
export const MAXIMUM_PASSWORD_LENGTH = 40;
export const MAXIMUM_PASSWORD_LENGTH_MESSAGE
    = `The password needs to be at most ${MAXIMUM_PASSWORD_LENGTH} characters long.`;
export const PASSWORD_PATTERN_MESSAGE
    = "The password needs to have a lowercase and an uppercase letter, a digit and a special character.";
export const PASSWORD_HINT
    = `Password has to be ${MINIMUM_PASSWORD_LENGTH}-${MAXIMUM_PASSWORD_LENGTH} characters long (including a lowercase letter, an uppercase letter, a digit and a special character.)`;

export const BUTTON_REGISTER_TEXT = "Register";

export const INVALID_DATA_MESSAGE = "Invalid request data!";
export const USER_ALREADY_EXISTS_MESSAGE = "User with such username already exists!";
export const SERVER_ERROR_MESSAGE = "Server error, try again!";
export const SIGNED_UP_SUCCESSFULLY_MESSAGE = "Signed up successfully!";

@Component({
    selector: "identity-registration",
    templateUrl: "./registration.component.html",
    styleUrls: ["./registration.component.scss"]
})
export class RegistrationComponent implements OnInit {

    readonly strings = {
        username: {
            label: USERNAME_LABEL,
            hint: USERNAME_HINT,
            required: USERNAME_REQUIRED_MESSAGE,
            tooShort: MINIMUM_USERNAME_LENGTH_MESSAGE,
            tooLong: MAXIMUM_USERNAME_LENGTH_MESSAGE,
            doesntMatchPattern: USERNAME_PATTERN_MESSAGE
        },
        password: {
            label: PASSWORD_LABEL,
            hint: PASSWORD_HINT,
            required: PASSWORD_REQUIRED_MESSAGE,
            tooShort: MINIMUM_PASSWORD_LENGTH_MESSAGE,
            tooLong: MAXIMUM_PASSWORD_LENGTH_MESSAGE,
            doesntMatchPattern: PASSWORD_PATTERN_MESSAGE
        },
        button: {
            register: BUTTON_REGISTER_TEXT
        }
    };

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
            }
        };
    }

    private get credentials(): Credentials {
        return {
            username: this.controls.username.value,
            password: this.controls.password.value
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
        this.authenticationService.signUp(this.credentials).subscribe({
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
                this.snackBarService.openSnackBar(INVALID_DATA_MESSAGE);
                break;
            }
            case 409: {
                this.snackBarService.openSnackBar(USER_ALREADY_EXISTS_MESSAGE);
                break;
            }
            case 500: {
                this.snackBarService.openSnackBar(SERVER_ERROR_MESSAGE);
                break;
            }
        }
    }

}
