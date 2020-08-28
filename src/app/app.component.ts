import {Component} from '@angular/core';
import {AuthenticationService} from '@authentication/authentication-service/authentication.service';
import {Router} from '@angular/router';
import {SimpleUser} from '@my-account/data/SimpleUser';
import {LoggedInUserService} from '@shared/logged-in-user/logged-in-user.service';

export const ADD_ITEM = 'Add item';
export const BUTTON_BROWSE_ITEMS_TEXT = 'Browse items';
export const BUTTON_MY_ACCOUNT_TEXT = 'My account';
export const BUTTON_LOG_OUT_TEXT = 'Log out';
export const BUTTON_LOG_IN_TEXT = 'Log in';

@Component({
    selector: 'elx-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(
        private authenticationService: AuthenticationService,
        private loggedInUserService: LoggedInUserService,
        private router: Router) {
    }

    /**
     * All links that can be displayed in the toolbar.
     */
        // tslint:disable-next-line:variable-name
    private readonly _toolbarLinks: ToolbarLink[] = [
        {
            displayedName: ADD_ITEM,
            function: () => this.navigateToAddItem(),
            authenticationRequired: true
        },
        {
            displayedName: BUTTON_BROWSE_ITEMS_TEXT,
            function: () => this.navigateToItems(),
            authenticationRequired: null
        },
        {
            displayedName: BUTTON_MY_ACCOUNT_TEXT,
            function: () => this.navigateToMyAccount(),
            authenticationRequired: true
        },
        {
            displayedName: BUTTON_LOG_OUT_TEXT,
            function: () => this.logOut(),
            authenticationRequired: true
        },
        {
            displayedName: BUTTON_LOG_IN_TEXT,
            function: () => this.navigateToLogIn(),
            authenticationRequired: false
        }
    ];

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

    get authenticatedUser(): SimpleUser | null {
        return this.loggedInUserService.authenticatedUser;
    }

    // noinspection JSUnusedLocalSymbols - called from template using callFunction
    private logOut() {
        this.authenticationService.logOut().then(_ => window.location.reload());
    }

    // noinspection JSUnusedLocalSymbols - called from template using callFunction
    private navigateToLogIn() {
        console.log('navigating to log-in');
        this.router.navigateByUrl('/log-in').then(_ => {
            console.log('navigated!');
        });
    }

    // noinspection JSUnusedLocalSymbols - called from template using callFunction
    private navigateToMyAccount() {
        this.router.navigateByUrl('/my-account').then(_ => {
        });
    }

    // noinspection JSUnusedLocalSymbols - called from template using callFunction
    private navigateToItems() {
        this.router.navigateByUrl('/items').then(_ => {
        });
    }

    // noinspection JSUnusedLocalSymbols - called from template using callFunction
    private navigateToAddItem() {
        this.router.navigateByUrl('/items/add').then(_ => {
        });
    }
}

/**
 * Used to hold data about sections to which user can navigate from toolbar.
 */
interface ToolbarLink {
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
