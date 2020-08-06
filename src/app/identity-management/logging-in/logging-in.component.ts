import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../authentication-service/authentication.service';
import {HttpErrorResponse} from '@angular/common/http';
import {SnackBarService} from '../../shared/snack-bar-service/snack-bar.service';
import {Credentials} from '../authentication-service/Credentials';
import {MyErrorStateMatcher} from '../../shared/MyErrorStateMatcher';

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
    selector: 'identity-logging-in',
    templateUrl: './logging-in.component.html',
    styleUrls: ['./logging-in.component.scss']
})
export class LoggingInComponent implements OnInit {

    readonly strings = {
        username: {
            label: USERNAME_LABEL,
            requiredMessage: USERNAME_REQUIRED_MESSAGE
        },
        password: {
            label: PASSWORD_LABEL,
            requiredMessage: PASSWORD_REQUIRED_MESSAGE,
        },
        buttons: {
            forgotPasswordText: BUTTON_FORGOT_PASSWORD_TEXT,
            logInText: BUTTON_LOG_IN_TEXT,
            registerText: BUTTON_REGISTER_TEXT
        }
    };

    readonly controls = Object.freeze({
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required])
    });

    readonly errorStateMatcher = new MyErrorStateMatcher();
    readonly form = new FormGroup(this.controls);

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router,
        private snackBarService: SnackBarService) {
    }

    get errors() {
        return {
            notProvided: this.controls.username.hasError('required'),
            passwordNotProvided: this.controls.password.hasError('required')
        };
    }

    private get credentials(): Credentials {
        return {
            username: this.controls.username.value,
            password: this.controls.password.value
        };
    }

    ngOnInit() {
        if (this.authenticationService.authenticatedUser !== null) {
            this.router.navigateByUrl('/items').then(() => {
                this.snackBarService.openSnackBar(
                    LOGGED_IN_SUCCESSFULLY_MESSAGE(this.authenticationService.authenticatedUser)
                );
            });
        }
    }

    login() {
        this.authenticationService.logIn(this.credentials).subscribe({
            next: () => {
                this.router.navigateByUrl('/items').then(() => {
                    this.snackBarService.openSnackBar(
                        LOGGED_IN_SUCCESSFULLY_MESSAGE(this.controls.username.value)
                    );
                });
            },
            error: errorResponse => this.openErrorSnackBar(errorResponse)
        });
    }

    routeToRegistration() {
        this.router.navigateByUrl('/register').then(_ => {
        });
    }

    private openErrorSnackBar(errorResponse: HttpErrorResponse) {
        if (errorResponse.status === 403) {
            this.snackBarService.openSnackBar(INCORRECT_USERNAME_OR_PASSWORD_MESSAGE);
        } else {
            this.snackBarService.openSnackBar(SERVER_ERROR_MESSAGE);
        }
    }
}
