import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from "../authentication-service/authentication.service";
import {HttpErrorResponse} from "@angular/common/http";
import {SnackBarService} from "@shared/snack-bar-service/snack-bar.service";
import {Credentials} from "@authentication/data/Credentials";
import {MyErrorStateMatcher} from "@shared/MyErrorStateMatcher";
import {LoggedInUserService} from "@shared/logged-in-user/logged-in-user.service";

/**
 * Labels and messages used in the component.
 */
export const STRINGS = {
    username: {
        label: "Username",
        requiredMessage: "A username is required!"
    },
    password: {
        label: "Password",
        requiredMessage: "A password is required!",
    },
    buttons: {
        forgotPasswordText: "Forgot password",
        logInText: "Log in",
        registerText: "Register"
    },
    messages: {
        incorrectUsernameOrPassword: "Incorrect username or password!",
        serverError: "Server error, try again!",
        loggedInSuccessfully: (username: string) => `Welcome, ${username}!`
    }
};

@Component({
    selector: "identity-logging-in",
    templateUrl: "./logging-in.component.html",
    styleUrls: ["./logging-in.component.scss"]
})
export class LoggingInComponent implements OnInit {

    readonly strings = STRINGS;

    readonly controls = {
        username: new FormControl("", [Validators.required]),
        password: new FormControl("", [Validators.required])
    };

    readonly errorStateMatcher = new MyErrorStateMatcher();
    readonly form = new FormGroup(this.controls);

    constructor(
        private loggedInUserService: LoggedInUserService,
        private authenticationService: AuthenticationService,
        private router: Router,
        private snackBarService: SnackBarService) {
    }

    get errors() {
        return {
            notProvided: this.controls.username.hasError("required"),
            passwordNotProvided: this.controls.password.hasError("required")
        };
    }

    private get credentials(): Credentials {
        return {
            username: this.controls.username.value,
            password: this.controls.password.value
        };
    }

    ngOnInit() {
        // TODO: use a guard instead
        if (this.loggedInUserService.authenticatedUser !== null) {
            this.router.navigateByUrl("/items").then(() => {
                if (this.loggedInUserService.authenticatedUser !== null) {
                    this.snackBarService.openSnackBar(
                        STRINGS.messages.loggedInSuccessfully(this.loggedInUserService.authenticatedUser.username)
                    );
                }
            });
        }
    }

    login() {
        this.authenticationService.logIn(this.credentials).subscribe({
            next: () => {
                this.router.navigateByUrl("/items").then(() => {
                    this.snackBarService.openSnackBar(
                        STRINGS.messages.loggedInSuccessfully(this.controls.username.value)
                    );
                });
            },
            error: errorResponse => this.openErrorSnackBar(errorResponse)
        });
    }

    routeToRegistration() {
        this.router.navigateByUrl("/register").then(_ => {
        });
    }

    private openErrorSnackBar(errorResponse: HttpErrorResponse) {
        if (errorResponse.status === 403) {
            this.snackBarService.openSnackBar(STRINGS.messages.incorrectUsernameOrPassword);
        } else {
            this.snackBarService.openSnackBar(STRINGS.messages.serverError);
        }
    }
}
