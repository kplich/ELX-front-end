import {Injectable} from "@angular/core";
import {SimpleUser} from "@my-account/data/SimpleUser";
import {JwtStorageService} from "@shared/jwt-storage-service/jwt-storage.service";

/**
 * Service for retrieving data about currently logged in user.
 */
@Injectable({
    providedIn: "root"
})
export class LoggedInUserService {

    constructor(private jwtStorageService: JwtStorageService) {
    }

    /**
     * Get currently logged-in user.
     * @return currently logged-in user object if they are logged in
     *          or null if they're not
     */
    get authenticatedUser(): SimpleUser | null {
        return this.jwtStorageService.getAuthenticatedUser();
    }
}
