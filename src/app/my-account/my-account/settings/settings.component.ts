import {HttpErrorResponse} from "@angular/common/http";
import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {AuthenticationService} from "src/app/authentication/authentication-service/authentication.service";
import {PasswordChangeRequest} from "src/app/authentication/data/PasswordChangeRequest";
import {SnackBarService} from "src/app/shared/snack-bar-service/snack-bar.service";

export const INVALID_DATA_MESSAGE = "Invalid request data!";
export const SERVER_ERROR_MESSAGE = "Server error, try again!";
export const PASSWORD_CHANGED_SUCCESSFULLY_MESSAGE = "Changed password successfully!";

export const STRINGS = {
    accountSettings: {
        title: "Account settings",
        description: "Change password, link your Ethereum wallet, etc.",
        changePasswordHeader: "Change password"
    }
};

@Component({
    selector: "my-account-settings",
    templateUrl: "./settings.component.html",
    styleUrls: ["./settings.component.scss"],
})
export class SettingsComponent {
    readonly strings = STRINGS;

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router,
        private snackBarService: SnackBarService
    ) {
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
