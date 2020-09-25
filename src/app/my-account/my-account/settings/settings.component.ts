import {HttpErrorResponse} from "@angular/common/http";
import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AuthenticationService} from "src/app/authentication/authentication-service/authentication.service";
import {PasswordChangeRequest} from "src/app/authentication/data/PasswordChangeRequest";
import {SnackBarService} from "src/app/shared/snack-bar-service/snack-bar.service";
import {SimpleUser} from "@my-account/data/SimpleUser";
import {LoggedInUserService} from "@shared/logged-in-user/logged-in-user.service";

export const INVALID_DATA_MESSAGE = "Invalid request data!";
export const SERVER_ERROR_MESSAGE = "Server error, try again!";
export const PASSWORD_CHANGED_SUCCESSFULLY_MESSAGE = "Changed password successfully!";

export const STRINGS = {
    accountSettings: {
        title: "Account settings",
        description: "Change password, link your Ethereum wallet, etc.",
        changePasswordHeader: "Change password",
        ethereumAddressHeader: "Your Ethereum address",
        enableEthereumHeader: "Enable Ethereum"
    }
};

@Component({
    selector: "my-account-settings",
    templateUrl: "./settings.component.html",
    styleUrls: ["./settings.component.scss"],
})
export class SettingsComponent implements OnInit {
    readonly strings = STRINGS;

    loggedInUser!: SimpleUser;

    constructor(
        private loggedInUserService: LoggedInUserService,
        private authenticationService: AuthenticationService,
        private router: Router,
        private snackBarService: SnackBarService
    ) {
    }

    ngOnInit() {
        const loggedInUser = this.loggedInUserService.authenticatedUser;

        if (loggedInUser === null) {
            throw new Error("Logged in user must exist!");
        }

        this.loggedInUser = loggedInUser;
    }

    sendPasswordChangeRequest(request: PasswordChangeRequest) {
        this.authenticationService
            .changePassword(request)
            .subscribe({
                next: () => {
                    this.authenticationService.logOut();
                    this.router.navigateByUrl("/items").then(() => {
                        this.snackBarService.openSnackBar(
                            PASSWORD_CHANGED_SUCCESSFULLY_MESSAGE
                        );
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
