import {Component} from '@angular/core';
import {AuthenticationService} from './identity-management/authentication-service/authentication.service';
import {Router} from '@angular/router';

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
        private router: Router) {
    }

    /**
     * All links that can be displayed in the toolbar.
     */
        // tslint:disable-next-line:variable-name
    private readonly _toolbarLinks: ToolbarLink[] = [
        {
            displayedName: ADD_ITEM,
            function: 'navigateToAddItem',
            authenticationRequired: true
        },
        {
            displayedName: BUTTON_BROWSE_ITEMS_TEXT,
            function: 'navigateToItems',
            authenticationRequired: null
        },
        {
            displayedName: BUTTON_MY_ACCOUNT_TEXT,
            function: 'navigateToMyAccount',
            authenticationRequired: true
        },
        {
            displayedName: BUTTON_LOG_OUT_TEXT,
            function: 'logOut',
            authenticationRequired: true
        },
        {
            displayedName: BUTTON_LOG_IN_TEXT,
            function: 'navigateToLogIn',
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

    get authenticatedUser(): string | null {
        return this.authenticationService.authenticatedUser;
    }

    /**
     * Calls one of the functions below.
     */
    callFunction(functionName: string) {
        this[functionName]();
    }

    // noinspection JSUnusedLocalSymbols - called from template using callFunction
    private logOut() {
        this.authenticationService.logOut().then(_ => window.location.reload());
    }

    // noinspection JSUnusedLocalSymbols - called from template using callFunction
    private navigateToLogIn() {
        this.router.navigateByUrl('/log-in').then(_ => {
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
    function: string;

    /**
     * Indicates if authentication is necessary to display the link. True means authentication
     * is required. False means that only unauthenticated users should see the link.
     * Null means that everyone can see the link.
     */
    authenticationRequired: boolean | null;
}
