import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../authentication-service/authentication.service';
import {HttpErrorResponse} from '@angular/common/http';
import {SnackBarService} from '../../shared/snack-bar-service/snack-bar.service';
import {Credentials} from '../authentication-service/Credentials';

export const USERNAME_LABEL = 'Username';
export const USERNAME_REQUIRED_MESSAGE = 'A username is required!';

export const PASSWORD_LABEL = 'Password';
export const PASSWORD_REQUIRED_MESSAGE = 'A password is required!';

export const INCORRECT_USERNAME_OR_PASSWORD_MESSAGE = 'Incorrect username or password!';
export const SERVER_ERROR_MESSAGE = 'Server error, try again!';
export const LOGGED_IN_SUCCESSFULLY_MESSAGE = (username: string) => `Welcome, ${username}!`;

export const BUTTON_FORGOT_PASSWORD_TEXT = 'Forgot password';
export const BUTTON_LOG_IN_TEXT = 'Log in';
export const BUTTON_REGISTER_TEXT = 'Register';

@Component({
  selector: 'app-logging-in',
  templateUrl: './logging-in.component.html',
  styleUrls: ['./logging-in.component.scss']
})
export class LoggingInComponent implements OnInit {

  usernameLabel = USERNAME_LABEL;
  usernameRequiredMessage = USERNAME_REQUIRED_MESSAGE;

  passwordLabel = PASSWORD_LABEL;
  passwordRequiredMessage = PASSWORD_REQUIRED_MESSAGE;

  buttonForgotPasswordText = BUTTON_FORGOT_PASSWORD_TEXT;
  buttonLogInText = BUTTON_LOG_IN_TEXT;
  buttonRegisterText = BUTTON_REGISTER_TEXT;

  loggingInForm: FormGroup;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private snackBarService: SnackBarService) {
    this.loggingInForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {}

  login() {
    this.authenticationService.logIn(this.credentials).subscribe({
      next: _ => {
        // tslint:disable-next-line:no-shadowed-variable
        this.router.navigateByUrl('/browse-items').then(_ => {
          this.snackBarService.openSnackBar(LOGGED_IN_SUCCESSFULLY_MESSAGE(this.username.value));
        });
      },
      error: errorResponse => this.openErrorSnackBar(errorResponse)
    });
  }

  routeToRegistration() {
    this.router.navigateByUrl('/register').then(_ => {});
  }

  get username(): FormControl {
    return this.loggingInForm.get('username') as FormControl;
  }

  get password(): FormControl {
    return this.loggingInForm.get('password') as FormControl;
  }

  private openErrorSnackBar(errorResponse: HttpErrorResponse) {
    if (errorResponse.status === 403) {
      this.snackBarService.openSnackBar(INCORRECT_USERNAME_OR_PASSWORD_MESSAGE);
    }
    else {
      this.snackBarService.openSnackBar(SERVER_ERROR_MESSAGE);
    }
  }

  private get credentials(): Credentials {
    return {username: this.username.value, password: this.password.value};
  }
}
