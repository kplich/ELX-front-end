import {Injectable} from "@angular/core";
import * as jwt_decode from "jwt-decode";
import {SimpleUser} from "@my-account/data/SimpleUser";

/**
 * The key used to store the token in Session Storage.
 */
export const JWT_TAG = "jwt";

/**
 * A service used to save JWT to/retrieve JWT from the Session Storage.
 */
@Injectable({
    providedIn: "root"
})
export class JwtStorageService {

    constructor() {
    }

    /**
     * Puts the token in Session Storage. If it already exists, it's overwritten.
     * @param token token
     */
    putJwt(token: string) {
        sessionStorage.setItem(JWT_TAG, token);
    }

    /**
     * Reads the token from Session Storage.
     * @return the token if it was put in the Session Storage or null if it wasn't
     */
    getJwt(): string | null {
        return sessionStorage.getItem(JWT_TAG);
    }

    /**
     * Removes the token from Session Storage.
     */
    removeJwt() {
        sessionStorage.removeItem(JWT_TAG);
    }

    /**
     * Returns the user whose data are encoded within the JWT
     * @return currently authenticated user if their data is in the
     *          Session Storage or null otherwise
     */
    getAuthenticatedUser(): SimpleUser | null {
        const token = sessionStorage.getItem(JWT_TAG);

        if (token === null) {
            return null;
        } else {
            const payload = jwt_decode<JwtDto>(token);
            console.log(payload);
            return new SimpleUser({
                id: parseInt(payload.sub, 10),
                ethereumAddress: payload.eth_address,
                username: payload.username
            });
        }
    }
}

/**
 * Interface for representing the data encoded in the JWT.
 */
interface JwtDto {
    /**
     * JWT's sub property - contains the ID of the user.
     */
    sub: string;

    /**
     * User's Ethereum address.
     */
    eth_address: string | null;

    /**
     * User's username.
     */
    username: string;
}
