import {Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {environment} from "@environments/environment";
import {Observable} from "rxjs";
import {shareReplay, tap} from "rxjs/operators";
import {JwtStorageService} from "@shared/jwt-storage-service/jwt-storage.service";
import {Credentials} from "@authentication/data/Credentials";
import {PasswordChangeRequest} from "@authentication/data/PasswordChangeRequest";
import {AUTHORIZATION, BEARER} from "@routing/jwt-interceptor/jwt.interceptor";
import {SetEthereumAddressRequest} from "@my-account/data/SetEthereumAddressRequest";
import {RegistrationRequest} from "@authentication/data/RegistrationRequest";

/**
 * API URL for authentication purposes.
 */
export const API_URL = `${environment.apiUrl}/auth`;

/**
 * Service used in Authentication Module for authentication purposes - logging in,
 * signing up and setting your Ethereum address.
 */
@Injectable({
    providedIn: "root"
})
export class AuthenticationService {

    constructor(private httpClient: HttpClient, private jwtStorageService: JwtStorageService) {
    }

    private static getTokenFromResponse(response: HttpResponse<any>): string {
        const header = response.headers.get(AUTHORIZATION);

        if (header === null) {
            throw new Error("Authorization token not found!");
        }

        if (header.startsWith(BEARER)) {
            return header.replace(BEARER, "").trim();
        } else {
            throw new Error("Bearer JSON Web Token required!");
        }
    }

    logIn(credentials: Credentials): Observable<HttpResponse<any>> {
        return this.httpClient.post(`${API_URL}/log-in`, credentials, {observe: "response"}).pipe(
            tap(response => {
                if (response.ok) {
                    this.jwtStorageService
                        .putJwt(AuthenticationService.getTokenFromResponse(response));
                }
            }),
            shareReplay()
        );
    }

    changePassword(passwordChangeRequest: PasswordChangeRequest): Observable<HttpResponse<any>> {
        return this.httpClient.post(`${API_URL}/change-password`, passwordChangeRequest, {observe: "response"}).pipe(
            shareReplay()
        );
    }

    setEthereumAddress(setEthereumAddressRequest: SetEthereumAddressRequest): Observable<void> {
        return this.httpClient.put<void>(`${API_URL}/set-ethereum-address`, setEthereumAddressRequest);
    }

    signUp(registrationRequest: RegistrationRequest): Observable<HttpResponse<any>> {
        return this.httpClient.post(`${API_URL}/sign-up`, registrationRequest, {observe: "response"}).pipe(
            shareReplay()
        );
    }

    logOut(): void {
        this.jwtStorageService.removeJwt();
    }
}
