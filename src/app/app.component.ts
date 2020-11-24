import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {SimpleUser} from "@my-account/data/SimpleUser";
import {LoggedInUserService} from "@shared/logged-in-user/logged-in-user.service";
import { AuthenticationService } from "@authentication/authentication-service/authentication.service";

/**
 * Labels and error messages used in the component.
 */
export const STRINGS = {
    links: {
        addItem: "Add item",
        browseItems: "Browse items",
        myAccount: "My account",
        logOut: "Log out",
        logIn: "Log in"
    }
};

/**
 * Root component of the application.
 */
@Component({
    selector: "elx-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent {
    /**
     * All links that can be displayed in the toolbar.
     */
    // tslint:disable-next-line:variable-name
    private readonly _toolbarLinks: ToolbarLink[] = [
        {
            displayedName: STRINGS.links.addItem,
            function: () => this.navigateToAddItem(),
            authenticationRequired: true
        },
        {
            displayedName: STRINGS.links.browseItems,
            function: () => this.navigateToItems(),
            authenticationRequired: null
        },
        {
            displayedName: this.authenticatedUser ?
                `${STRINGS.links.myAccount} (${this.authenticatedUser.username})`
                : `${STRINGS.links.myAccount}`,
            function: () => this.navigateToMyAccount(),
            authenticationRequired: true
        },
        {
            displayedName: STRINGS.links.logOut,
            function: () => this.logOut(),
            authenticationRequired: true
        },
        {
            displayedName: STRINGS.links.logIn,
            function: () => this.navigateToLogIn(),
            authenticationRequired: false
        }
    ];

    constructor(
        private authenticationService: AuthenticationService,
        private loggedInUserService: LoggedInUserService,
        private router: Router) {
    }

    /**
     * Toolbar links filtered depending on user's authentication.
     */
    get toolbarLinks(): ToolbarLink[] {
        return this._toolbarLinks.filter(link => {
            if (this.authenticatedUser !== null) {
                return link.authenticationRequired !== false;
            } else {
                return link.authenticationRequired !== true;
            }
        });
    }

    /**
     * Returns a currently logged in user or null if there isn't any.
     */
    get authenticatedUser(): SimpleUser | null {
        return this.loggedInUserService.authenticatedUser;
    }

    private logOut() {
        this.authenticationService.logOut();
        window.location.reload();
    }

    private navigateToLogIn() {
        console.log("navigating to log-in");
        this.router.navigateByUrl("/log-in").then(_ => {
            console.log("navigated!");
        });
    }

    private navigateToMyAccount() {
        this.router.navigateByUrl("/my-account").then(_ => {
        });
    }

    private navigateToItems() {
        this.router.navigateByUrl("/items").then(_ => {
        });
    }

    private navigateToAddItem() {
        this.router.navigateByUrl("/items/add").then(_ => {
        });
    }
}

/**
 * Used to hold data about sections to which user can navigate from toolbar.
 */
interface ToolbarLink {
    /**
     * The name of the link that will be displayed in the page.
     */
    displayedName: string;

    /**
     * Function name from AppComponent that should be called on clicking the link.
     */
    function: () => void;

    /**
     * Indicates if authentication is necessary to display the link. True means authentication
     * is required. False means that only unauthenticated users should see the link.
     * Null means that everyone can see the link.
     */
    authenticationRequired: boolean | null;
}
