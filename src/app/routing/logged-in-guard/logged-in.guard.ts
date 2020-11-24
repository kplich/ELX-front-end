import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {LoggedInUserService} from "@shared/logged-in-user/logged-in-user.service";

/**
 * A guard that only allows further navigation if the user is logged in.
 */
@Injectable({
    providedIn: "root"
})
export class LoggedInGuard implements CanActivate {
    constructor(private loggedInUserService: LoggedInUserService, private router: Router) {
    }

    /**
     * Implementation of CanActivate interface. Only allows navigation if the user
     * is logged in.
     */
    canActivate(
        next: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        if (this.loggedInUserService.authenticatedUser !== null) {
            return true;
        } else {
            return this.router.navigate(["/log-in"]);
        }
    }
}
