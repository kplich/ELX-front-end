import {HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators, ValidationErrors, AbstractControl} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '@authentication/authentication-service/authentication.service';
import {PasswordChangeRequest} from '@authentication/data/PasswordChangeRequest';
import {SnackBarService} from '@shared/snack-bar-service/snack-bar.service';
import {MyErrorStateMatcher} from '@shared/MyErrorStateMatcher';

export const ACCOUNT_SETTINGS_TITLE = 'Account settings';
export const ACCOUNT_SETTINGS_DESCRIPTION = 'Change password, link your Ethereum wallet, etc.';

export const CHANGE_PASSWORD_TITLE = 'Change password';

export const OLD_PASSWORD_LABEL = 'Old password';
export const NEW_PASSWORD_LABEL = 'New password';
export const MINIMUM_PASSWORD_LENGTH = 8;
export const MAXIMUM_PASSWORD_LENGTH = 40;
export const NEW_PASSWORD_HINT =
    `Password has to be ${MINIMUM_PASSWORD_LENGTH}-${MAXIMUM_PASSWORD_LENGTH} characters long
  (including a lowercase letter, an uppercase letter, a digit and a special character)
  and different from the old password.`;
export const OLD_PASSWORD_REQUIRED_MESSAGE = 'Old password is required!';
export const NEW_PASSWORD_REQUIRED_MESSAGE = 'New password is required!';
export const MINIMUM_PASSWORD_LENGTH_MESSAGE =
    `The password needs to be at least ${MINIMUM_PASSWORD_LENGTH} characters long.`;
export const MAXIMUM_PASSWORD_LENGTH_MESSAGE =
    `The password needs to be at most ${MAXIMUM_PASSWORD_LENGTH} characters long.`;
export const PASSWORD_PATTERN_MESSAGE =
    'The password needs to have a lowercase and an uppercase ' +
    'letter, a digit and a special character.';
export const PASSWORDS_EQUAL_MESSAGE = 'Passwords can\'t be equal.';
export const BUTTON_CHANGE_PASSWORD_TEXT = 'Change password';

export const INVALID_DATA_MESSAGE = 'Invalid request data!';
export const SERVER_ERROR_MESSAGE = 'Server error, try again!';
export const PASSWORD_CHANGED_SUCCESSFULLY_MESSAGE =
    'Changed password successfully!';

export function passwordsNotEqualValidator(formGroup: AbstractControl): ValidationErrors | null {
    const oldPassword = formGroup.get('oldPassword');
    const newPassword = formGroup.get('newPassword');

    if (oldPassword === null || newPassword === null) {
        throw new Error('form controls not found');
    }

    return oldPassword.value !== newPassword.value
        ? null
        : {passwordsmatch: true};
}

@Component({
    selector: 'my-account-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
    readonly strings = {
        accountSettings: {
            title: ACCOUNT_SETTINGS_TITLE,
            description: ACCOUNT_SETTINGS_DESCRIPTION,
            changePassword: {
                title: CHANGE_PASSWORD_TITLE,
                oldPassword: {
                    label: OLD_PASSWORD_LABEL,
                    notProvided: OLD_PASSWORD_REQUIRED_MESSAGE
                },
                newPassword: {
                    label: NEW_PASSWORD_LABEL,
                    hint: NEW_PASSWORD_HINT,
                    notProvided: NEW_PASSWORD_REQUIRED_MESSAGE,
                    tooShort: MINIMUM_PASSWORD_LENGTH_MESSAGE,
                    tooLong: MAXIMUM_PASSWORD_LENGTH_MESSAGE,
                    doesntMatchPattern: PASSWORD_PATTERN_MESSAGE
                },
                passwordsEqual: PASSWORDS_EQUAL_MESSAGE,
                button: BUTTON_CHANGE_PASSWORD_TEXT
            }
        }
    };

    // language=JSRegexp
    readonly containsUppercaseLetterPattern = '.*[A-Z]+.*';
    // language=JSRegexp
    readonly containsLowercaseLetterPattern = '.*[a-z]+.*';
    // language=JSRegexp
    readonly containsDigitPattern = '.*\\d+.*';
    // language=JSRegexp
    readonly containsSpecialCharacterPattern = '.*[\\W_]+.*';

    readonly controls = {
        oldPassword: new FormControl('', [Validators.required]),
        newPassword: new FormControl('', [
            Validators.required,
            Validators.pattern(this.containsLowercaseLetterPattern),
            Validators.pattern(this.containsUppercaseLetterPattern),
            Validators.pattern(this.containsDigitPattern),
            Validators.pattern(this.containsSpecialCharacterPattern),
            Validators.minLength(MINIMUM_PASSWORD_LENGTH),
            Validators.maxLength(MAXIMUM_PASSWORD_LENGTH),
        ]),
    };

    readonly form: FormGroup = new FormGroup(
        {
            oldPassword: new FormControl('', [Validators.required]),
            newPassword: new FormControl('', [
                Validators.required,
                Validators.pattern(this.containsLowercaseLetterPattern),
                Validators.pattern(this.containsUppercaseLetterPattern),
                Validators.pattern(this.containsDigitPattern),
                Validators.pattern(this.containsSpecialCharacterPattern),
                Validators.minLength(MINIMUM_PASSWORD_LENGTH),
                Validators.maxLength(MAXIMUM_PASSWORD_LENGTH),
            ]),
        },
        passwordsNotEqualValidator
    );

    readonly errorStateMatcher: ErrorStateMatcher = new MyErrorStateMatcher();

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router,
        private snackBarService: SnackBarService
    ) {
    }

    public get errors() {
        return {
            oldPassword: {
                notProvided: this.controls.oldPassword.hasError('required')
            },
            newPassword: {
                notProvided: this.controls.newPassword.hasError('required'),
                tooShort: () => this.controls.newPassword.hasError('minlength'),
                tooLong: () => this.controls.newPassword.hasError('maxlength'),
                doesntMatchPattern: () => {
                    return !this.errors.newPassword.tooShort()
                        && !this.errors.newPassword.tooLong()
                        && this.controls.newPassword.hasError('pattern');
                }
            },
            passwordsAreNotEqual: () => {
                return (
                    this.controls.oldPassword.dirty &&
                    this.controls.newPassword.dirty &&
                    !this.errors.newPassword.tooShort() &&
                    !this.errors.newPassword.tooLong() &&
                    !this.errors.newPassword.doesntMatchPattern() &&
                    this.form.hasError('passwordsmatch')
                );
            }
        };
    }

    private get passwordChangeRequest(): PasswordChangeRequest {
        return {
            oldPassword: this.controls.oldPassword.value,
            newPassword: this.controls.newPassword.value,
        };
    }

    ngOnInit(): void {
    }

    sendPasswordChangeRequest() {
        this.authenticationService
            .changePassword(this.passwordChangeRequest)
            .subscribe({
                next: () => {
                    this.authenticationService.logOut().then(() => {
                        this.router.navigateByUrl('/browse-items').then(() => {
                            this.snackBarService.openSnackBar(
                                PASSWORD_CHANGED_SUCCESSFULLY_MESSAGE
                            );
                        });
                    });
                },
                error: (error) => this.openSnackBarOnError(error),
            });
    }

    private openSnackBarOnError(errorResponse: HttpErrorResponse) {
        switch (errorResponse.status) {
            case 400: {
                this.snackBarService.openSnackBar(INVALID_DATA_MESSAGE);
                break;
            }
            case 500: {
                this.snackBarService.openSnackBar(SERVER_ERROR_MESSAGE);
                break;
            }
        }
    }
}
