import {HttpErrorResponse} from "@angular/common/http";
import {Component, OnInit, OnDestroy} from "@angular/core";
import {Router} from "@angular/router";
import {AuthenticationService} from "@authentication/authentication-service/authentication.service";
import {PasswordChangeRequest} from "@authentication/data/PasswordChangeRequest";
import {SnackBarService} from "@shared/snack-bar-service/snack-bar.service";
import {SimpleUser} from "@my-account/data/SimpleUser";
import {LoggedInUserService} from "@shared/logged-in-user/logged-in-user.service";
import {Web3Service} from "@shared/web3/web3.service";
import { Subscription } from "rxjs";
import {SetEthereumAddressRequest} from "@my-account/data/SetEthereumAddressRequest";

/**
 * Labels and messages used in the component.
 */
export const STRINGS = {
    accountSettings: {
        title: "Account settings",
        description: "Change password, link your Ethereum wallet, etc.",
        changePasswordHeader: "Change password",
        ethereumAddressHeader: "Your Ethereum address",
        enableEthereumHeader: "Enable Ethereum"
    },
    messages: {
        invalidData: "Invalid request data!",
        serverError: "Server error, try again!",
        passwordChangedSuccessfully: "Changed password successfully!"
    }
};

@Component({
    selector: "my-account-settings",
    templateUrl: "./settings.component.html",
    styleUrls: ["./settings.component.scss"],
})
export class SettingsComponent implements OnInit, OnDestroy {
    readonly strings = STRINGS;

    loggedInUser!: SimpleUser;

    private accountsSubscription!: Subscription;
    accounts!: string[];

    constructor(
        private web3Service: Web3Service,
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

        this.accountsSubscription = this.web3Service.accounts$.subscribe({
            next: (newAccounts: string[]) => this.accounts = newAccounts,
            error: (err: any) => console.error(err)
        });
    }

    ngOnDestroy(): void {
        this.accountsSubscription.unsubscribe();
    }

    sendPasswordChangeRequest(request: PasswordChangeRequest) {
        this.authenticationService
            .changePassword(request)
            .subscribe({
                next: () => {
                    this.authenticationService.logOut();
                    this.router.navigateByUrl("/items").then(() => {
                        this.snackBarService.openSnackBar(
                            STRINGS.messages.passwordChangedSuccessfully
                        );
                    });
                },
                error: (error) => this.openSnackBarOnError(error),
            });
    }

    sendEthereumAddressSettingRequest(request: SetEthereumAddressRequest) {
        this.authenticationService.setEthereumAddress(request).subscribe({
            next: () => {
                const loggedInUser = this.loggedInUserService.authenticatedUser;
                if (loggedInUser === null) {
                    throw new Error("Logged in user must exist!");
                }
                this.loggedInUser = loggedInUser;

                this.authenticationService.logOut();
                this.router.navigateByUrl("/log-in").then(() => {
                    this.snackBarService.openSnackBar("Log in once again to apply your changes!");
                });
            },
            error: (error: HttpErrorResponse) => console.error(error)
        });
    }

    private openSnackBarOnError(errorResponse: HttpErrorResponse) {
        switch (errorResponse.status) {
            case 400: {
                this.snackBarService.openSnackBar(STRINGS.messages.invalidData);
                break;
            }
            case 500: {
                this.snackBarService.openSnackBar(STRINGS.messages.serverError);
                break;
            }
        }
    }
}
