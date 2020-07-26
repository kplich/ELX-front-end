import {HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../identity-management/authentication-service/authentication.service';
import {PasswordChangeRequest} from '../../identity-management/authentication-service/PasswordChangeRequest';
import {SnackBarService} from '../../shared/snack-bar-service/snack-bar.service';
import {MyErrorStateMatcher} from '../../shared/MyErrorStateMatcher';

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

export function passwordsNotEqualValidator(formGroup: FormGroup) {
  const oldPasswordInput = formGroup.get('oldPasswordInput');
  const newPasswordInput = formGroup.get('newPasswordInput');

  return oldPasswordInput.value !== newPasswordInput.value
    ? null
    : { passwordsmatch: true };
}

@Component({
  selector: 'my-account-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  passwordChangeMessages = {
    accountSettingsTitle: ACCOUNT_SETTINGS_TITLE,
    accountSettingsDescription: ACCOUNT_SETTINGS_DESCRIPTION,
    changePasswordTitle: CHANGE_PASSWORD_TITLE,
    oldPasswordLabel: OLD_PASSWORD_LABEL,
    oldPasswordRequiredMessage: OLD_PASSWORD_REQUIRED_MESSAGE,
    newPasswordLabel: NEW_PASSWORD_LABEL,
    newPasswordHint: NEW_PASSWORD_HINT,
    newPasswordRequiredMessage: NEW_PASSWORD_REQUIRED_MESSAGE,
    minimumPasswordLengthMessage: MINIMUM_PASSWORD_LENGTH_MESSAGE,
    maximumPasswordLengthMessage: MAXIMUM_PASSWORD_LENGTH_MESSAGE,
    passwordPatternMessage: PASSWORD_PATTERN_MESSAGE,
    passwordsEqualMessage: PASSWORDS_EQUAL_MESSAGE,
    changePasswordButtonText: BUTTON_CHANGE_PASSWORD_TEXT};

  // language=JSRegexp
  containsUppercaseLetterPattern = '.*[A-Z]+.*';
  // language=JSRegexp
  containsLowercaseLetterPattern = '.*[a-z]+.*';
  // language=JSRegexp
  containsDigitPattern = '.*\\d+.*';
  // language=JSRegexp
  containsSpecialCharacterPattern = '.*[\\W_]+.*';

  passwordChangeForm: FormGroup = new FormGroup(
    {
      oldPasswordInput: new FormControl('', [Validators.required]),
      newPasswordInput: new FormControl('', [
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

  errorStateMatcher: ErrorStateMatcher = new MyErrorStateMatcher();

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {}

  sendPasswordChangeRequest() {
    console.log(this.passwordChangeRequest);
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

  get oldPasswordInput(): FormControl {
    return this.passwordChangeForm.get('oldPasswordInput') as FormControl;
  }

  get newPasswordInput(): FormControl {
    return this.passwordChangeForm.get('newPasswordInput') as FormControl;
  }

  get passwordChangeRequest(): PasswordChangeRequest {
    return {
      oldPassword: this.oldPasswordInput.value,
      newPassword: this.newPasswordInput.value,
    };
  }

  get oldPasswordNotProvided(): boolean {
    return this.oldPasswordInput.hasError('required');
  }

  get newPasswordNotProvided(): boolean {
    return this.newPasswordInput.hasError('required');
  }

  get newPasswordTooShort(): boolean {
    return this.newPasswordInput.hasError('minlength');
  }

  get newPasswordTooLong(): boolean {
    return this.newPasswordInput.hasError('maxlength');
  }

  get newPasswordDoesntMatchPattern(): boolean {
    return (
      !this.newPasswordTooShort &&
      !this.newPasswordTooLong &&
      this.newPasswordInput.hasError('pattern')
    );
  }

  get passwordsAreEqual(): boolean {


    return (
      this.newPasswordInput.dirty &&
      this.oldPasswordInput.dirty &&
      !this.newPasswordTooShort &&
      !this.newPasswordTooLong &&
      !this.newPasswordInput.hasError('pattern') &&
      this.passwordChangeForm.hasError('passwordsmatch')
    );
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
