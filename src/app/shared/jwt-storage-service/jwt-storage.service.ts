import {Injectable} from "@angular/core";
import * as jwt_decode from "jwt-decode";
import {SimpleUser} from "@my-account/data/SimpleUser";

export const JWT_TAG = "jwt";

@Injectable({
    providedIn: "root"
})
export class JwtStorageService {

    constructor() {
    }

    putJwt(token: string) {
        sessionStorage.setItem(JWT_TAG, token);
    }

    getJwt(): string | null {
        return sessionStorage.getItem(JWT_TAG);
    }

    removeJwt() {
        sessionStorage.removeItem(JWT_TAG);
    }

    getAuthenticatedUser(): SimpleUser | null {
        const token = sessionStorage.getItem(JWT_TAG);

        if (token === null) {
            return null;
        } else {
            const payload = jwt_decode<JwtDto>(token);
            return new SimpleUser({
                id: parseInt(payload.sub, 10),
                ethereumAddress: payload.ethereumAddress,
                username: payload.username
            });
        }
    }
}

interface JwtDto {
    sub: string;
    ethereumAddress: string | null;
    username: string;
}
