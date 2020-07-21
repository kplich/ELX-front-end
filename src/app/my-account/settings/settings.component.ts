import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators, Form} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {AuthenticationService} from '../../identity-management/authentication-service/authentication.service';
import {PasswordChangeRequest} from '../../identity-management/authentication-service/PasswordChangeRequest';
import {SnackBarService} from '../../shared/snack-bar-service/snack-bar.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

export const ACCOUNT_SETTINGS_TITLE = 'Account settings';
export const ACCOUNT_SETTINGS_DESCRIPTION = 'Change password, link your Ethereum wallet, etc.';

export const CHANGE_PASSWORD_TITLE = 'Change password';

export const OLD_PASSWORD_LABEL = 'Old password';
export const NEW_PASSWORD_LABEL = 'New password';
export const MINIMUM_PASSWORD_LENGTH = 8;
export const MAXIMUM_PASSWORD_LENGTH = 40;
export const PASSWORD_HINT = `Password has to be ${MINIMUM_PASSWORD_LENGTH}-${MAXIMUM_PASSWORD_LENGTH} characters long (including a lowercase letter, an uppercase letter, a digit and a special character) and different from the old password.`;
export const OLD_PASSWORD_REQUIRED_MESSAGE = 'Old password is required!';
export const NEW_PASSWORD_REQUIRED_MESSAGE = 'New password is required!';
export const MINIMUM_PASSWORD_LENGTH_MESSAGE = `The password needs to be at least ${MINIMUM_PASSWORD_LENGTH} characters long.`;
export const MAXIMUM_PASSWORD_LENGTH_MESSAGE = `The password needs to be at most ${MAXIMUM_PASSWORD_LENGTH} characters long.`;
export const PASSWORD_PATTERN_MESSAGE = 'The password needs to have a lowercase and an uppercase letter, a digit and a special character.';
export const PASSWORDS_EQUAL_MESSAGE = 'Passwords can\'t be equal.';
export const CHANGE_PASSWORD_BUTTON_TEXT = 'Change password';

export const PASSWORDS_MATCH_TAG = 'passwordsmatch';

export const INVALID_DATA_MESSAGE = 'Invalid request data!';
export const SERVER_ERROR_MESSAGE = 'Server error, try again!';
export const PASSWORD_CHANGED_SUCCESSFULLY_MESSAGE = 'Changed password successfully!';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export function passwordsNotEqualValidator(formGroup: FormGroup) {
  const oldPasswordInput = formGroup.get('oldPasswordInput');
  const newPasswordInput = formGroup.get('newPasswordInput');

  return oldPasswordInput.value !== newPasswordInput.value
    ? null : {'passwordsmatch': true};
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  accountSettingsTitle = ACCOUNT_SETTINGS_TITLE;
  accountSettingsDescription = ACCOUNT_SETTINGS_DESCRIPTION;

  changePasswordTitle = CHANGE_PASSWORD_TITLE;

  oldPasswordLabel = OLD_PASSWORD_LABEL;
  oldPasswordRequiredMessage = OLD_PASSWORD_REQUIRED_MESSAGE;

  newPasswordLabel = NEW_PASSWORD_LABEL;
  newPasswordHint = PASSWORD_HINT;
  newPasswordRequiredMessage = NEW_PASSWORD_REQUIRED_MESSAGE;
  minimumPasswordLengthMessage = MINIMUM_PASSWORD_LENGTH_MESSAGE;
  maximumPasswordLengthMessage = MAXIMUM_PASSWORD_LENGTH_MESSAGE;
  passwordPatternMessage = PASSWORD_PATTERN_MESSAGE;
  passwordsEqualMessage = PASSWORDS_EQUAL_MESSAGE;

  changePasswordButtonText = CHANGE_PASSWORD_BUTTON_TEXT;

  // language=JSRegexp
  containsUppercaseLetterPattern = '.*[A-Z]+.*';
  // language=JSRegexp
  containsLowercaseLetterPattern = '.*[a-z]+.*';
  // language=JSRegexp
  containsDigitPattern = '.*\\d+.*';
  // language=JSRegexp
  containsSpecialCharacterPattern = '.*[\\W_]+.*';

  passwordChangeForm: FormGroup = new FormGroup({
    oldPasswordInput: new FormControl('', [Validators.required]),
    newPasswordInput: new FormControl('', [
      Validators.required,
      Validators.pattern(this.containsLowercaseLetterPattern),
      Validators.pattern(this.containsUppercaseLetterPattern),
      Validators.pattern(this.containsDigitPattern),
      Validators.pattern(this.containsSpecialCharacterPattern),
      Validators.minLength(MINIMUM_PASSWORD_LENGTH),
      Validators.maxLength(MAXIMUM_PASSWORD_LENGTH)
    ])
  }, passwordsNotEqualValidator);

  errorStateMatcher: ErrorStateMatcher = new MyErrorStateMatcher();

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private snackBarService: SnackBarService
  ) {

  }

  ngOnInit(): void {
  }

  sendPasswordChangeRequest() {
    console.log(this.passwordChangeRequest);
    this.authenticationService.changePassword(this.passwordChangeRequest).subscribe({
      next: _ => {
        this.authenticationService.logOut().then(_ => {
          this.router.navigateByUrl('/browse-items').then(_ => {
            this.snackBarService.openSnackBar(PASSWORD_CHANGED_SUCCESSFULLY_MESSAGE);
          })
        });
      },
      error: error => this.openSnackBarOnError(error)
    });
  }

  get oldPasswordInput(): FormControl {
    return this.passwordChangeForm.get('oldPasswordInput') as FormControl;
  }

  get newPasswordInput(): FormControl {
    return this.passwordChangeForm.get('newPasswordInput') as FormControl;
  }

  get passwordChangeRequest(): PasswordChangeRequest {
    return {oldPassword: this.oldPasswordInput.value, newPassword: this.newPasswordInput.value}
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
    return !this.newPasswordTooShort && !this.newPasswordTooLong
        && this.newPasswordInput.hasError('pattern');
  }

  get passwordsAreEqual(): boolean {
    return this.passwordChangeForm.touched
      && this.passwordChangeForm.dirty
      && !this.newPasswordTooShort
      && !this.newPasswordTooLong
      && !this.newPasswordInput.hasError('patter')
      && this.passwordChangeForm.hasError('passwordsmatch');
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
