import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {AuthenticationService} from '../authentication-service/authentication.service';
import {Credentials} from '../authentication-service/Credentials';
import {SnackBarService} from '../../shared/snack-bar-service/snack-bar.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {MyErrorStateMatcher} from '../../shared/MyErrorStateMatcher';

export const USERNAME_LABEL = 'Username';
export const USERNAME_REQUIRED_MESSAGE = 'A username is required!';
export const MINIMUM_USERNAME_LENGTH = 3;
export const MINIMUM_USERNAME_LENGTH_MESSAGE = `The username needs to be at least ${MINIMUM_USERNAME_LENGTH} characters long.`;
export const MAXIMUM_USERNAME_LENGTH = 20;
export const MAXIMUM_USERNAME_LENGTH_MESSAGE = `The username needs to be at most ${MAXIMUM_USERNAME_LENGTH} characters long.`;
export const USERNAME_PATTERN_MESSAGE = 'Username can only contain letters, digits and underscores (_).';
export const USERNAME_HINT = `Username has to be ${MINIMUM_USERNAME_LENGTH}-${MAXIMUM_USERNAME_LENGTH} characters long and can only contain letters, digits and underscores (_).`;

export const PASSWORD_LABEL = 'Password';
export const PASSWORD_REQUIRED_MESSAGE = 'A password is required!';
export const MINIMUM_PASSWORD_LENGTH = 8;
export const MINIMUM_PASSWORD_LENGTH_MESSAGE = `The password needs to be at least ${MINIMUM_PASSWORD_LENGTH} characters long.`;
export const MAXIMUM_PASSWORD_LENGTH = 40;
export const MAXIMUM_PASSWORD_LENGTH_MESSAGE = `The password needs to be at most ${MAXIMUM_PASSWORD_LENGTH} characters long.`;
export const PASSWORD_PATTERN_MESSAGE = 'The password needs to have a lowercase and an uppercase letter, a digit and a special character.';
export const PASSWORD_HINT = `Password has to be ${MINIMUM_PASSWORD_LENGTH}-${MAXIMUM_PASSWORD_LENGTH} characters long (including a lowercase letter, an uppercase letter, a digit and a special character.)`;

export const BUTTON_REGISTER_TEXT = 'Register';

export const INVALID_DATA_MESSAGE = 'Invalid request data!';
export const USER_ALREADY_EXISTS_MESSAGE = 'User with such username already exists!';
export const SERVER_ERROR_MESSAGE = 'Server error, try again!';
export const SIGNED_UP_SUCCESSFULLY_MESSAGE = 'Signed up successfully!';

@Component({
  selector: 'identity-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

    // TODO: refactor this into single readonly 'strings' object';
  usernameLabel = USERNAME_LABEL;
  usernameHint = USERNAME_HINT;
  usernameRequiredMessage = USERNAME_REQUIRED_MESSAGE;
  minimumUsernameLengthMessage = MINIMUM_USERNAME_LENGTH_MESSAGE;
  maximumUsernameLengthMessage = MAXIMUM_USERNAME_LENGTH_MESSAGE;
  usernamePatternMessage = USERNAME_PATTERN_MESSAGE;

  passwordLabel = PASSWORD_LABEL;
  passwordHint = PASSWORD_HINT;
  passwordRequiredMessage = PASSWORD_REQUIRED_MESSAGE;
  minimumPasswordLengthMessage = MINIMUM_PASSWORD_LENGTH_MESSAGE;
  maximumPasswordLengthMessage = MAXIMUM_PASSWORD_LENGTH_MESSAGE;
  passwordPatternMessage = PASSWORD_PATTERN_MESSAGE;

  buttonRegisterText = BUTTON_REGISTER_TEXT;

  // language=JSRegexp
  lettersDigitsUnderscoresPattern = '\\w*';
  // language=JSRegexp
  containsUppercaseLetterPattern = '.*[A-Z]+.*';
  // language=JSRegexp
  containsLowercaseLetterPattern = '.*[a-z]+.*';
  // language=JSRegexp
  containsDigitPattern = '.*\\d+.*';
  // language=JSRegexp
  containsSpecialCharacterPattern = '.*[\\W_]+.*';

  registrationForm: FormGroup = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(MINIMUM_USERNAME_LENGTH),
      Validators.maxLength(MAXIMUM_USERNAME_LENGTH),
      Validators.pattern(this.lettersDigitsUnderscoresPattern)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(this.containsLowercaseLetterPattern),
      Validators.pattern(this.containsUppercaseLetterPattern),
      Validators.pattern(this.containsDigitPattern),
      Validators.pattern(this.containsSpecialCharacterPattern),
      Validators.minLength(MINIMUM_PASSWORD_LENGTH),
      Validators.maxLength(MAXIMUM_PASSWORD_LENGTH)
    ])
  });
  errorStateMatcher: ErrorStateMatcher = new MyErrorStateMatcher();

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {}

  register() {
    this.authenticationService.signUp(this.credentials).subscribe({
      // tslint:disable-next-line:no-shadowed-variable
      next: _ => this.router.navigateByUrl('/log-in').then(_ => {
        this.snackBarService.openSnackBar(SIGNED_UP_SUCCESSFULLY_MESSAGE);
      }),
      error: error => this.openSnackBarOnError(error)
    });
  }

  get username(): FormControl {
    return this.registrationForm.get('username') as FormControl;
  }

  get password(): FormControl {
    return this.registrationForm.get('password') as FormControl;
  }

  get usernameNotProvided(): boolean {
    return this.username.hasError('required');
  }

  get usernameTooShort(): boolean {
    return this.username.hasError('minlength');
  }

  get usernameTooLong(): boolean {
    return this.username.hasError('maxlength');
  }

  get usernameDoesntMatchPattern(): boolean {
    return !this.usernameTooShort && !this.usernameTooLong
        && this.username.hasError('pattern');
  }

  get passwordNotProvided(): boolean {
    return this.password.hasError('required');
  }

  get passwordTooShort(): boolean {
    return this.password.hasError('minlength');
  }

  get passwordTooLong(): boolean {
    return this.password.hasError('maxlength');
  }

  get passwordDoesntMatchPattern(): boolean {
    return !this.passwordTooShort && !this.passwordTooLong
        && this.password.hasError('pattern');
  }

  private get credentials(): Credentials {
    return {username: this.username.value, password: this.password.value};
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
